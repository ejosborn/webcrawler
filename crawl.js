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
  for (const a of aLinks){
    //checking if has a path from b
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

  return listOfUrls
}

module.exports = {
  normalizeURL,
  getURLsFromHTML
};
