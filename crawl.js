const { JSDOM } = require('jsdom');

// Accepts a URL as input and returns a "normalized" URL
//e.g. https://espn.com/nfl => espn.com/nfl
function normalizeURL(url) {
  const myURL = new URL(url);
  let path = myURL.pathname;

  //slices last char off if is '/' to normalize URL
  //e.g. https://espn.com/nfl/ => https://espn.com/nfl
  if (path.charAt(path.length - 1) === '/') {
    path = path.slice(0, path.length - 1);
  }

  const returnPath = myURL.hostname + path;
  return returnPath;
}

// Takes a string of HTML as input and returns an array of all un-normalized URLs found within the HTML
function getURLsFromHTML(htmlBody, baseURL) {
  const dom = new JSDOM(htmlBody);
  const listOfUrls = [];
  const aLinks = dom.window.document.querySelectorAll('a')

  for (const a of aLinks) {
    //checking if has a path from baseURL
    if (a.href.slice(0,1) === '/'){
      try {
        listOfUrls.push(new URL(a.href, baseURL).href)
      } catch (err){
        console.log(`${err.message}: ${a.href}`)
      }
    }
    else {
      try {
        listOfUrls.push(new URL(a.href).href)
      } catch (err){
        console.log(`${err.message}: ${a.href}`)
      }
    }
  }
  return listOfUrls;
}

//
async function crawlPage(baseUrl, currentUrl, pages) {  
  //1a. Make sure currentUrl and baseURL are on the same domain. 
  const base = new URL(baseUrl);
  const newURL = new URL(currentUrl);

  //1b. If not, return the pages object.
  if(base.hostname !== newURL.hostname)
  {
    return pages;
  }

  console.log(`crawling ${currentUrl}`);

  //2. Getting normalized version of url
  const checkURL = normalizeURL(currentUrl);

  //3. Check if pages has entry of normalized url. Increment entry if exists. Otherwise, create entry
  if(checkURL in pages) {
    pages[checkURL] = (pages[checkURL] || 0) + 1;
  }
  else {
    pages.push({
      key: `${checkURL}`,
      value: 1
      })
  }

  //getting html from currentUrl
  try {
    const response = await fetch(currentUrl)
    const respType = response.headers.get('content-type');

    //checking if fetch was successful or not
    if (response.status > 399)
    {
      console.log(`A ${response.status} error has occurred. Please try again`);
      return ;
    }
    
    //checking if the content that was fetched was html/text
    if (respType.includes('text/html'))
    {
      console.log(`Got non-html response: ${respType}`);
      return ;
    }

    //outputs the html text
    console.log(await response.text)
  } catch (err)
  {
    console.log(`${err.message}`)
  }
  
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage
};
