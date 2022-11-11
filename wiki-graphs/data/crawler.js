const axios = require('axios');
const cheerio = require('cheerio');

const { writeMapToFile, fetchUrl, getGraphFromWikiPages } = require('./utils');

let totalLinks = 0;
const TOAL_LINKS_INSIDE = 4;
const baseURL = 'https://pt.wikipedia.org';
const graphTitleWikiPages = new Map();
const mapTitlesToLinks = new Map();

const scrapeInit = async () => {
  await scrapeWiki('/wiki/Wikipédia');

  writeMapToFile('graph_titles', graphTitleWikiPages);
  writeMapToFile('titles_links', mapTitlesToLinks);
};

const scrapeWiki = async path => {
  const promises = [];
  if (totalLinks > TOAL_LINKS_INSIDE) {
    console.log('------------------------------------ SAINDO...');
    return;
  }

  const $ = await fetchUrl(`${baseURL}${path}`);
  if ($ === null) return;

  const links = $('.mw-parser-output a');

  const filteredLinks = getGraphFromWikiPages(
    links,
    graphTitleWikiPages,
    mapTitlesToLinks,
  );

  filteredLinks.forEach(async link => {
    promises.push(scrapeWiki(link));
  });

  totalLinks += 1;
  console.log(totalLinks);
  await Promise.all(promises);
};

// scrapeInit();

const scrapeWikiPage = async pageUrl => {
  const { data } = await axios.get(baseURL + pageUrl);
  const $ = cheerio.load(data);

  const pageHyperlinks = [];
  $('#mw-content-text a:not(.image)').each((idx, el) => {
    const { title, href } = el.attribs;

    if (title && href.startsWith('/wiki/')) {
      pageHyperlinks.push({ title, link: href });
    }
  });

  return pageHyperlinks;
};

module.exports = {
  scrapeWikiPage,
};
