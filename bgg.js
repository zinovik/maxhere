const dotenv = require('dotenv');
const { updateGames } = require('./src/lambda/scripts/update-games');

dotenv.config();

if (process.env.ALLOW_UPDATES) {
  updateGames('content');
}
