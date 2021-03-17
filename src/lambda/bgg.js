const dotenv = require('dotenv');

const { getGames } = require('./get-games');

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

  const date = await getGames();

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      result: 'success',
      date,
    }),
  };
};
