const fs = require('fs').promises;

exports.handler = async () => {
  try {
    const content = await fs.readFile(`${process.cwd()}/bgg.json`, {
      encoding: 'utf-8',
    });
    return {
      statusCode: 200,
      body: content,
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: e,
    };
  }
};
