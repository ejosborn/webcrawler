const { JSDOM } = require('jsdom');

// Accepts a URL as input and returns a "normalized" URL
//e.g. https://espn.com/nfl => espn.com/nfl
function normalizeURL(url) {
  const myURL = new URL(url);
  let path = myURL.pathname;

  //slices last char off if is '/' to normalize URL
  //e.g. https://espn.com/nfl/ => https://espn.com/nfl
  if (path.charAt(path.length - 1) === '/') 
  {
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

  for (const a of aLinks) 
  {
    //checking if has a path from baseURL
    if (a.href.slice(0,1) === '/'){
      //adding url to listOfUrls
      try 
      {
        listOfUrls.push(new URL(a.href, baseURL).href)
      } catch (err) 
      {
        console.log(`${err.message}: ${a.href}`)
      }
    }
    else 
    {
      try 
      {
        //adding url to listOfUrls
        listOfUrls.push(new URL(a.href).href)
      } catch (err) 
      {
        console.log(`${err.message}: ${a.href}`)
      }
    }
  }
  return listOfUrls;
}

//
async function crawlPage(baseUrl, currentUrl, pages) {  
  const base = new URL(baseUrl);
  const newURL = new URL(currentUrl);

  //checking if urls are in same domain
  if(base.hostname !== newURL.hostname)
  {
    return pages;
  }

  // Getting normalized version of url
  const checkURL = normalizeURL(currentUrl);

  // Check if pages has entry of normalized url. Increment entry if exists
  if(pages[checkURL] > 0) 
  {
    pages[checkURL]++;
    return pages;
  }
  else 
  {
  // Add entry and initialize to 1 if not exist. Initialize to 0 if checkURL is same as baseURL
    if (currentUrl === baseUrl)
    {
      pages[checkURL] = 0
    }
    else 
    {
      pages[checkURL] = 1
    }
  }

  // Make a fetch request to the currentUrl
  console.log(`crawling ${currentUrl}`);
  let htmlCode = ''
  try 
  {
    const response = await fetch(currentUrl)
    

    //checking if fetch was successful or not
    if (response.status > 399)
    {
      console.log(`A ${response.status} error has occurred. Please try again`);
      return pages;
    }
    
    //checking if the content that was fetched was not html/text
    const respType = response.headers.get('content-type');
    if (!(respType.includes('text/html')))
    {
      console.log(`Got non-html response: ${respType}`);
      return pages;
    }

    htmlCode = await response.text();
  } catch (err)
  {
    console.log(`${err.message}`)
  }
  
  //gets list of URLs from htmlCode
  const listOfUrls = getURLsFromHTML(htmlCode, baseUrl);

  //recursive call to each url in the list
  for(const url of listOfUrls)
  {
    pages = await crawlPage(baseUrl, url, pages);
  } 

  return pages;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage
};
