const BGG_GAMES_PATH = './content/bgg.json';
const DIGITAL_BOARD_GAMES_PATH =
  './content/blog/digital-board-games/digital-board-games.json';

const bggGames = require(BGG_GAMES_PATH);
const digitalBoardGames = require(DIGITAL_BOARD_GAMES_PATH);

bggGames.games.forEach(game => {
  if (game.rank < 500 && !Object.keys(digitalBoardGames).includes(game.name)) {
    console.log(`${game.rank} ${game.name} (${game.year})`);
  }
});

console.log('\n---\n');

Object.keys(digitalBoardGames).forEach(digitalBoardGameName => {
  if (!bggGames.games.some(game => game.name === digitalBoardGameName)) {
    console.log(digitalBoardGameName);
  }
});
