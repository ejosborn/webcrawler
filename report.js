function printReport(pages) {

    //sort pages
    const pagesDict = Object.entries(pages);
    pagesDict.sort((pageA, pageB) => {
        return pageB[1] - pageA[1]
    })

    //prints pages in an easy readable manner
    console.log('------------------');
    console.log('      REPORT      ');
    console.log('------------------');
    for (const sorted of pagesDict)
    {
        const link = sorted[0];
        const num = sorted[1];
        console.log(`Found ${num} internal links to ${link}`)
    }
}

module.exports = {
    printReport
}