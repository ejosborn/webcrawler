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
  //1a. Make sure currentUrl and baseURL are on the same domain. 
  const base = new URL(baseUrl);
  const newURL = new URL(currentUrl);

  //1b. If not, return the pages object.
  if(base.hostname !== newURL.hostname)
  {
    return pages;
  }

  //2. Getting normalized version of url
  const checkURL = normalizeURL(currentUrl);
  const normBase = normalizeURL(base);

  //3. Check if pages has entry of normalized url. Increment entry if exists
  if(checkURL in pages) 
  {
    pages[checkURL] = (pages[checkURL] || 1) + 1;
    return pages;
  }
  else 
  {
  //4. Add entry and initialize to 1 if not exist. Initialize to 0 if checkURL is same as baseURL
    if (checkURL === normBase)
    {
      pages[checkURL] = 0
    }
    else 
    {
      pages[checkURL] = 1
    }
  }

  //5. Make a fetch request to new url (currentUrl)
  console.log(`crawling ${currentUrl}`);
  
  try 
  {
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

    //6. Get a list of all the URLs from response the html code
    //gets the html code if fetch was successful
    const htmlCode = await response.text;

    //gets list of URLs from htmlCode
    const listOfUrls = getURLsFromHTML(htmlCode);

    //7. Recursively call each URL found

  } catch (err)
  {
    console.log(`${err.message}`)
  }
  
  //8. Return updated pages
  return pages;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage
};
