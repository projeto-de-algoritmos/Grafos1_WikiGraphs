const { writeMapToFile, fetchUrl, getGraphFromWikiPages } = require('./utils');

const baseURL = 'https://pt.wikipedia.org';
const graphTitleWikiPages = new Map();
const mapTitlesToLinks = new Map();

const scrapeData = async () => {
  const $ = await fetchUrl(`${baseURL}/wiki/Wikipédia`);
  const links = $('.mw-parser-output a');

  getGraphFromWikiPages(links, graphTitleWikiPages, mapTitlesToLinks);

  writeMapToFile('graph_titles', graphTitleWikiPages);
  writeMapToFile('titles_links', mapTitlesToLinks);
};

scrapeData();
