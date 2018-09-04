process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const glob = require( 'glob' )
const fs = require('fs')
const fm = require('front-matter')
const path = require("path")
const request = require('sync-request')
const shuffle = require('shuffle-array')

const rewriteAndCheckUrls = require("./util/rewriteAbsoluteToUrls")

// to avoid some TLS Cert problems for our internal github
//
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

// check if we run in a "cleanup" mode
//
const clean = process.argv.length===3 && process.argv[2]==="clean"
const repoCommits = "https://api.github.com/repos/gardener/website/commits"

// Parse all files and inline remote MarkDown content.
//
glob( __dirname+'/../hugo/content/**/*.md', function( err, files ) {

    // We must shuffel the files to process them in a random order...WHY THIS HACK?
    //
    // Github.com has some rate limits/hour. But we want to fetch the github commit statistic
    // for each file. At a dedicated point the github fetch is banned and we didn't get
    // any info about the commits. In this case we cache the statistic for each file and try to update
    // the files in a random order. With this strategy, the statistic get better and better for
    // each build - WHAT A HACK!!!!!!!
    shuffle(files)

    files.forEach(function(file){
        let content = fm(fs.readFileSync(file, 'utf8'))
        if(content.attributes.remote) {
            // transform a normal URL of a file to the RAW version.
            //
            let url = content.attributes.remote
            markdownUrl = url

            // we reference a complete repository. In this case we fetch the README.md and inline them
            //
            if(url.endsWith(".git")){
                url = url.replace(".git","/blob/master/README.md")
                markdownUrl = url
            }

            // The url points to a github wiki.
            // works just for external GITHUB
            //
            if(url.indexOf("/wiki")!==-1) {
                // Check if we gt a link to a GitHub wiki page. In this case we must transform them
                // to the RAW version as well
                // e.g. IN: https://github.com/gardener/documentation/wiki/Architecture
                //     OUT: https://raw.githubusercontent.com/wiki/gardener/documentation/Architecture.md
                let segments = url.replace("https://github.com/","").split("/")
                let user = segments[0]
                let project = segments[1]
                let doc = segments.slice(3).join("/")+".md"
                url = "https://raw.githubusercontent.com/wiki/"+user+"/"+project+"/"+doc
            }
            else {
                // Required to fetch the plain MarkDown instead of the rendered version
                //
                url = url
                        .replace("https://github.com/" ,"https://raw.githubusercontent.com/")
                        .replace("/blob/master/", "/master/")
                        .replace("/tree/master/", "/master/")
            }

            // Get the content of the references MD file and append it to the
            // Hugo CMS page...but only if we didn't run in the "clean" mode
            //
            let md = "";
            if(!clean){
                try {
                    md = fm(request("GET", url).getBody().toString()).body
                    md = rewriteAndCheckUrls(markdownUrl, md)
                }catch(err){
                    console.log("unable to get ",url)
                }
            }

            let newDoc = [
                "---",
                content.frontmatter,
                "---",
                md].join("\n")
            fs.writeFileSync(file, newDoc, 'utf8');
        }
        // ====================================================
        // try to fetch the github changes for the file
        // ====================================================
        // e.g. https://api.github.com/repos/gardener/gardener/commits?path=README.md
        //
        if(!clean){
            let commitsUrl = ""
            let relUrl =""
            if(content.attributes.remote){
                let changesUrl = content.attributes.remote;
                if (changesUrl.endsWith(".git")) {
                    changesUrl = changesUrl.replace(".git", "/README.md")
                }

                let segments = changesUrl.replace("https://github.com/", "").split("/")
                let user = segments[0]
                let project = segments[1]

                relUrl = changesUrl
                    .replace("/blob/master", "")
                    .replace("https://github.com/" + user + "/" + project, "")
                commitsUrl = ["https://api.github.com/repos", user, project, "commits"].join("/")

            }
            else{
                let rootDir = path.normalize(__dirname+"/..")
                relUrl =  file.replace(rootDir,"")
                commitsUrl = repoCommits
            }

            commitsUrl = commitsUrl + "?path=" + relUrl;
            try {
                console.log(commitsUrl)
                let commits = request("GET", commitsUrl, {
                    headers: {
                        'user-agent': 'example-user-agent',
                    }
                }).getBody().toString()
                commits = JSON.stringify(JSON.parse(commits),undefined,2)
                fs.writeFileSync(file + ".json", commits, 'utf8');
            }
            catch (err){
                //console.log(err)
            }
        }
    })


    // Parse all MarkdownFiles and check if any link reference to an remote site which we have imported.
    // In this case we REWRITE the link from REMOTE to LOCAL
    //
    glob(__dirname+ '/../hugo/content/**/*.md', function( err, files ) {
        var docPath = path.normalize(__dirname+ "/../hugo/content/")
        var importedMarkdownFiles = []
        // collect all remote links in the "front matter" annotations
        //
        files.forEach(function (file) {
            let content = fm(fs.readFileSync(file, 'utf8'))
            if (content.attributes.remote) {
                importedMarkdownFiles.push({file:file.replace(docPath,"/"),remote:content.attributes.remote})
            }
        })

        // check if any MD files referer to a imported page. In this case we rewrite the link to the
        // internal document
        //
        files.forEach(function (file) {
            let content = fm(fs.readFileSync(file, 'utf8'))
            if (content.attributes.remote) {
                let md = content.body;
                importedMarkdownFiles.forEach(function(entry){
                    md = md.split(entry.remote).join("{{< ref \""+entry.file+"\" >}}")
                })
                let newDoc = [
                    "---",
                    content.frontmatter,
                    "---",
                    md].join("\n")
                fs.writeFileSync(file, newDoc, 'utf8');
            }
        })

    })
});

