# Webcrawler

This is a project is a webcrawler that helped me solidify my use of Javascript. This project takes a website as input, crawls through each page that is on the same domain, and returns a report that shows how many times a link is referenced sorted from most to least number of referenced links.

## Getting Started

### Prerequisites

What is needed to install?
- Node.js
- NVM
- JSDOM for querying the HTML Code
- JEST if you want to run or make/add tests

### Installing

1 - First make sure [NVM](https://github.com/nvm-sh/nvm) is installed.
2 - If you want to run the test file, run the following in the terminal.
```js
npm install jest --save-dev
```
3 - Install the JSDOM dependency by the following in the terminal
```js
npm install jsdom
```

## Running the tests

Running the crawl.test.js file is as easy as typing the following in the terminal
```js
npm test
```

### Usage

The program will crawl any inputted website. To run the program enter the following:

```js
npm run start [insert website]
```