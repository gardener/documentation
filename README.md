# Gardener Documentation

## Overview of CI/CD build 

![image](images/overview.png)


### Documentation (this repository)
https://github.com/gardener/documentation/ contains the real content of the 
Landing page. Add/Remove/Modify/ pages or content here

### Generator
https://github.com/gardener/website-generator contains the site generator *Hugo*
and all the layout and js stuff.

### Website
The Repository https://github.com/gardener/website/ contains the generated
Landing page. All manual changes get lost.




# Contribute

## Add a new page

All content for your website will live inside the `./website/documentation` directory. Each top-level folder in Hugo is considered a 
content section. For example, if your site has three main sections — blog, getting-started, and tutorials — you will have 
three directories at `./website/documentation/010-blog`, `./website/documentation/020-getting-started`, and `./website/documentation/050-tutorials`.

### Order of content
Normally, the top navigation of a Hugo site is ordered by a `weight` attribute in the front matter section of the `_index.md`
file. For this website, I decide to use the **directory order and put a number in front of each directory**. With this
method, the directory order is synchronized with the menu order. This is more convenient for a content developer 
to navigate between website and content.


### Kind of pages
This website supports three kind of pages:

 - local
 - remote
 - repository
 
 
#### Local page
A `local` page is nothing special for hugo. A good example for a local page is 
the [./website/documentation/060-curated-links/_index.md](./website/documentation/060-curated-links/_index.md) file.



#### Remote Page
a `remote page` contains the front matter section with the reference to the remote `md` file.
Good example is [./website/documentation/020_getting-started/_index.md](./website/documentation/020_getting-started/_index.md)


#### Remote Repository
A `remote repo` contains just the front matter section. The real content is crawled during the build process.
A good example is the [./website/documentation/050-tutorials/content/app/https/_index.md](./website/documentation/050-tutorials/content/app/https/_index.md) page. 

The remote repo is referenced by the `remote` attribute in the front matter.


# Local setup 

## Install Required command line tools

You need [Hugo](https://github.com/gohugoio/hugo/releases) and [npm](https://www.npmjs.com/get-npm) installed.
Check that you have the correct hugo version (you need at least 0.45.1 which is used on our CI/CD)

```
hugo version

# Hugo Static Site Generator v0.45.1/extended darwin/amd64 BuildDate: unknown

```

## Setup development environment

```sh
# create development directory
#
mkdir gardener-site
cd gardener-site

# clone required repos
#
git clone https://github.com/gardener/documentation.git
git clone https://github.com/gardener/website-generator.git

# make a symbolic link of the pure "markdown" files into the hugo directory structure
#
ln -s ../documentation/website/documentation/ ./hugo/content

# install NPM package. required for the "fetch" job of external content
#
cd website-generator/
npm install

# crawl remote markdown content 
#
node ./node/index.js 


# serve the documentation with hugo
#
cd hugo
hugo serve

# Open the displayed URL and enjoy the documentation :-)
# write some pages and HUGO serve them with live update of your browser
# 



# ctrl+c to end the hugo server and cleanup the crawled remote pages before you "git add" something
#
node ./node/index.js clean

```