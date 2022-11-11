const {
  writeMapToFile,
  fetchUrl,
  getGraphFromWikiPages,
  getKeyByValue,
} = require('./utils');

let totalLinks = 0;
const TOAL_LINKS_INSIDE = 10;
const baseURL = 'https://pt.wikipedia.org';
const graphTitleWikiPages = new Map();
const mapTitlesToLinks = new Map();

const scrapeInit = async () => {
  await scrapeWiki('/wiki/Wikipédia');

  writeMapToFile('graph_titles', graphTitleWikiPages);
  writeMapToFile('titles_links', mapTitlesToLinks);

  graphTitleWikiPages.forEach((value, key) => {
    // console.log(value);
    if (Array.isArray(value) && value.length > 0) console.log(key);
  });
};

const scrapeWiki = async path => {
  const promises = [];
  if (totalLinks > TOAL_LINKS_INSIDE) {
    console.log(
      `------------------------------------ SAINDO[${totalLinks}]...`,
    );
    return;
  }

  const $ = await fetchUrl(`${baseURL}${path}`);
  if ($ === null) return;

  const links = $('.mw-parser-output a');

  const filteredLinks = getGraphFromWikiPages(
    getKeyByValue(mapTitlesToLinks, path),
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

scrapeInit();
