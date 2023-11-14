const { argv } = require('node:process')
const { normalizeURL, getURLsFromHTML, crawlPage } = require('./crawl.js');

async function main(){
//checking length of arguments input
    if(process.argv.length > 3) {
        console.log("Too many arguments have been entered. Please enter one (1) URL");
    }
    
    if (count < 3) {
        console.log("URL not entered");
    }

    let base = process.argv[2];
    let pages = {};
    console.log(`starting crawl of: ${base}`)

    await crawlPage(base, base, pages)
}

main()