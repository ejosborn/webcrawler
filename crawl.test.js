const { test, expect } = require('@jest/globals');
const { normalizeURL, getURLsFromHTML } = require('./crawl.js');

//tests normalizeURL() function
//writing tests to make sure normalizeURL() function works as intended
test('https://blog.boot.dev/path/ to blog.boot.dev/path', () => {
  expect(normalizeURL('https://blog.boot.dev/path/')).toBe(
    'blog.boot.dev/path'
  );
});

test('https://blog.boot.dev/path to blog.boot.dev/path', () => {
  expect(normalizeURL('https://blog.boot.dev/path')).toBe(
    'blog.boot.dev/path'
  );
});

test('http://blog.boot.dev/path/ to blog.boot.dev/path', () => {
  expect(normalizeURL('http://blog.boot.dev/path/')).toBe(
    'blog.boot.dev/path'
  );
});

test('http://blog.boot.dev/path to blog.boot.dev/path', () => {
  expect(normalizeURL('http://blog.boot.dev/path')).toBe(
    'blog.boot.dev/path'
  );
});


// tests getURLsFromHTML function

test('given html code, should return https://blog.boot.dev', () => {
  expect(getURLsFromHTML(
      '<html><body><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a></body></html>'
    )
  ).toEqual([ 'https://blog.boot.dev/' ]);
});

test('given html code, should return https://blog.boot.dev', () => {
  expect(getURLsFromHTML(
      '<html><body><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a><a href="https://espn.com"><span>Go to ESPN</span></a></body></html>'
    )
  ).toEqual([ 'https://blog.boot.dev/', 'https://espn.com/' ]);
});
