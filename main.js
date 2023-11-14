const { crawlPage } = require('./crawl.js');
const { printReport } = require('./report.js');

async function main(){
//checking length of arguments input
    if(process.argv.length > 3) {
        console.log("Too many arguments have been entered. Please enter one (1) URL");
        throw '';
    }
    if (process.argv.length < 3) {
        console.log("URL not entered");
        throw '';
    }

    let base = process.argv[2];
    console.log(`starting crawl of: ${base}`);

    const pages = await crawlPage(base, base, {});

    printReport(pages)
}

main()