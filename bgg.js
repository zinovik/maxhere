const request = require('request');
const { promisify } = require('util');
const rp = promisify(request);

const PAGES = 2;
const URL = 'https://boardgamegeek.com/browse/boardgame/page/';

const getPage = async pageNumber => {
  const { statusCode, body } = await rp(`${URL}${pageNumber}`);
  console.log(`${pageNumber}: ${statusCode}`);

  return body;
};

const parsePage = page => {
  const re = new RegExp('<a name="([0-9]+)">');
  const matchArray = re.exec(page);
  const rank = matchArray[1];

  return [
    {
      rank,
      name: 'name',
    },
  ];
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

  const allGames = gamesByPages.reduce(
    (acc, pageGames) => [...acc, ...pageGames],
    [],
  );

  console.log(allGames);
};

getGames();
