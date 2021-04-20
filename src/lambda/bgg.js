const dotenv = require('dotenv');

const { updateGames } = require('./scripts/update-games');

dotenv.config();

exports.handler = async () => {
  let data;

  try {
    data = JSON.parse(await updateGames(process.cwd(), true));
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        result: 'unexpected error getting games',
      }),
    };
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      result: 'success',
      data,
    }),
  };
};
