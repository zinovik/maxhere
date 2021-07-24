const BGG_GAMES_PATH = './content/bgg.json';
const DIGITAL_BOARD_GAMES_PATH =
  './content/blog/digital-board-games/digital-board-games.json';

const bggGames = require(BGG_GAMES_PATH);
const digitalBoardGames = require(DIGITAL_BOARD_GAMES_PATH);

bggGames.games.forEach(game => {
  if (game.rank < 400 && !Object.keys(digitalBoardGames).includes(game.name)) {
    console.log(`${game.rank} ${game.name}`);
  }
});
