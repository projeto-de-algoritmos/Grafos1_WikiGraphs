const {
  writeMapTitlesFromLinksToFile,
  fetchUrl,
  getGraphFromWikiPages,
} = require('./utils');

const baseURL = 'https://pt.wikipedia.org';
const graphWikiPages = new Map();

const scrapeData = async () => {
  const $ = await fetchUrl(`${baseURL}/wiki/Wikipédia`);
  const links = $('.mw-parser-output a');

  getGraphFromWikiPages(links, graphWikiPages);

  writeMapTitlesFromLinksToFile(graphWikiPages);
};

scrapeData();
