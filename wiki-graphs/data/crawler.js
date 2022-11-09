const axios = require('axios');
const cheerio = require('cheerio');

const baseURL = 'https://pt.wikipedia.org';

const scrapeData = async () => {
  const encodedURL = encodeURI(`${baseURL}/wiki/Wikipédia`);
  const { data } = await axios.get(encodedURL);

  const $ = cheerio.load(data);

  const links = $('.mw-parser-output a');

  //   console.log(links);
};

scrapeData();
