const dotenv = require('dotenv');

const { updateGames } = require('./scripts/update-games');

dotenv.config();

exports.handler = async ({ queryStringParameters: { token } }) => {
  if (token !== 'bgg') {
    return {
      statusCode: 401,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        result: 'wrong token',
      }),
    };
  }

  const data = await updateGames(process.cwd());

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      result: 'success',
      data,
    }),
  };
};
