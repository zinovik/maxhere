const dotenv = require('dotenv');

const { updateGames } = require('./scripts/update-games');

dotenv.config();

exports.handler = async ({ queryStringParameters: { token } }) => {
  console.log('New request');

  if (token !== 'bgg') {
    return {
      statusCode: 401,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        result: 'wrong token',
      }),
    };
  }

  const date = await updateGames('../../content/bgg.json');

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      result: 'success',
      date,
    }),
  };
};
