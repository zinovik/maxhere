const request = require('request');
const { promisify } = require('util');
const { DOMParser } = require('xmldom');
const { select } = require('xpath');
const fs = require('fs');

const rp = promisify(request);
const writeFileAsync = promisify(fs.writeFile);

const PAGES = 17;
const URL = 'https://boardgamegeek.com/browse/boardgame/page/';
const gameRanksXPath = `//td[@class='collection_rank']`;
const gameNamesXPath = `//div[starts-with(@id,'results_objectname')]//a`;
const gameYearsXPath = `//div[starts-with(@id,'results_objectname')]//span`;
const gameLinksXPath = `//div[starts-with(@id,'results_objectname')]//a/@href`;

const getPage = async pageNumber => {
  console.log(`Getting games from ${URL}${pageNumber}...`);
  const { statusCode, body } = await rp(`${URL}${pageNumber}`);
  console.log(`Page ${pageNumber} status code: ${statusCode}`);

  return body;
};

const parsePage = page => {
  const dom = new DOMParser({
    errorHandler: {
      warning: () => null,
      error: () => null,
      fatalError: () => null,
    },
  }).parseFromString(page);
  const ranks = select(gameRanksXPath, dom).map(selectedValue =>
    selectedValue.textContent.trim(),
  );
  const names = select(gameNamesXPath, dom).map(selectedValue =>
    selectedValue.textContent.trim(),
  );
  const years = select(gameYearsXPath, dom).map(selectedValue =>
    selectedValue.textContent.trim().replace('(', '').replace(')', ''),
  );
  const links = select(gameLinksXPath, dom).map(selectedValue =>
    selectedValue.textContent.trim(),
  );

  return ranks.map((rank, i) => ({
    rank,
    name: names[i],
    year: years[i],
    link: links[i],
  }));
};

const getPageGames = async pageNumber => {
  const page = await getPage(pageNumber);
  const games = parsePage(page);

  return games;
};

const getGames = async () => {
  const gamesByPages = await Promise.all(
    new Array(PAGES).fill().map((_, i) => getPageGames(i + 1)),
  );

  const games = gamesByPages.reduce(
    (acc, pageGames) => [...acc, ...pageGames],
    [],
  );

  await writeFileAsync(
    'content/bgg.json',
    JSON.stringify({
      date: new Date(),
      games,
    }),
  );

  console.log('Games info updated!');
};

getGames();
