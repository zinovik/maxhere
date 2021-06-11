const request = require('request');
const { promisify } = require('util');
const { DOMParser } = require('xmldom');
const { select } = require('xpath');
const fs = require('fs');

const rp = promisify(request);
const writeFileAsync = promisify(fs.writeFile);

const PAGES = 20;
const URL = 'https://boardgamegeek.com/browse/boardgame/page/';
const gameRanksXPath = `//td[@class='collection_rank']`;
const gameNamesYearsXPath = `//div[starts-with(@id,'results_objectname')]`;
const gameLinksXPath = `//div[starts-with(@id,'results_objectname')]//a/@href`;

const getPage = async pageNumber => {
  console.log(`Getting games from ${URL}${pageNumber}...`);
  const { statusCode, body } = await rp(
    `${URL}${pageNumber}?timestamp=${new Date().getTime()}`,
  );
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
  const namesYears = select(gameNamesYearsXPath, dom).map(selectedValue =>
    selectedValue.textContent.trim(),
  );
  const names = [];
  const years = [];
  namesYears.forEach(nameYear => {
    const endOfNameIndex = nameYear.indexOf('\n');
    const startOfYearIndex = nameYear.indexOf('\t(');

    if (endOfNameIndex === -1 || startOfYearIndex === -1) {
      names.push(nameYear);
      years.push('');

      return;
    }

    const name = nameYear.substring(0, endOfNameIndex);
    const year = nameYear
      .substring(startOfYearIndex + 1)
      .replace('(', '')
      .replace(')', '');

    names.push(name);
    years.push(year);
  });
  const links = select(gameLinksXPath, dom).map(selectedValue =>
    selectedValue.textContent.trim().replace('/boardgame/', ''),
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

const updateGames = async (filePath = '', isSkipFileUpdate) => {
  const gamesByPages = await Promise.all(
    new Array(PAGES).fill().map((_, i) => getPageGames(i + 1)),
  );

  const games = gamesByPages.reduce(
    (acc, pageGames) => [...acc, ...pageGames],
    [],
  );

  const data = JSON.stringify({
    date: new Date(),
    games,
  });

  if (!isSkipFileUpdate) {
    await writeFileAsync(`${filePath}/bgg.json`, data);
  }

  console.log('Games info updated!');

  return data;
};

module.exports = { updateGames };
