const isRelativeUrl = require('is-relative-url')
const path = require("path")
const urlExists = require("url-exists")


module.exports= function(documentPath, content) {
    let collectedLinks = []
    let mdMatchRegex = /\[([^\]]+)]\((.+?)(\))/g

    let md =  content.replace(mdMatchRegex, function (str, text, link) {
        if (isRelativeUrl(link) && link.indexOf("#")!==0) {
            var root = path.dirname(documentPath)
            link = root + "/" + link;
        }
        if(link.indexOf("#")!==0 && link.indexOf("mailto:")!==0)
            collectedLinks.push(link);
        link = link.replace(new RegExp(".png$", 'g'), ".png?raw=true")
        return '[' + text + '](' +link + ')'
    })
/*
    console.log("------------------------------")
    collectedLinks.forEach( link => {
        urlExists(link, (err, exists) => {
            if(exists===false)
                console.log(documentPath, link, exists)
            })
    })
*/

    return md;
}
