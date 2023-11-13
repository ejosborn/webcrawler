const { argv } = require('node:process')
const { normalizeURL, getURLsFromHTML } = require('./crawl.js');

function main(){
    
    //counting the arguments put in the command line
    let count = 0;
    let crawlURL = null;
    argv.forEach((val, index) => {
        count++;
        if(index == 2) {
            crawlURL = val;
        }
});

//exits program if invalid arguments
    if(count > 3) {
        console.log("Too many arguments have been entered. Please enter one (1) URL");
        throw '';
    }
    else if (count < 3) {
        console.log("URL not entered. Please enter one (1) URL");
        throw '';
    }
    else {
        console.log(`Web crawling ${crawlURL}`);
        throw '';
    }
    
    
}

main()