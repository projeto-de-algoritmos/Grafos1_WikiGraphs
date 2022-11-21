/* eslint-disable no-console */
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const { resolve } = require('path');

const writeMapToFile = (fileName, data) => {
  fs.writeFileSync(
    resolve(__dirname, 'dump', `${fileName}.json`),
    JSON.stringify(Object.fromEntries(data), null, 4),
  );
};

const fetchUrl = async url => {
  console.log(`Fetching '${encodeURI(url)}' ...`);

  try {
    const { data } = await axios.get(url);
    return cheerio.load(data);
  } catch (error) {
    return null;
  }
};

module.exports = {
  writeMapToFile,
  fetchUrl,
};
