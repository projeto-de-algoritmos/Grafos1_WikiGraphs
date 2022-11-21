const { writeMapToFile, fetchUrl } = require('./utils');

let count = 0;
const MAXPAGES = Number(process.argv[2]);
const baseURL = 'https://pt.wikipedia.org';
const graphWikiPages = new Map();

const scrapeInit = async () => {
  const encodedURL = encodeURI('/wiki/Wikipédia');

  const wikipediaTitle = 'Wikipédia';
  graphWikiPages.set(wikipediaTitle, { href: encodedURL, links: [] });
  await scrapeWiki(wikipediaTitle, encodedURL);

  writeMapToFile('graph_titles', graphWikiPages);
};

const scrapeWiki = async (pageTitle, pageURL) => {
  count += 1;

  const $ = await fetchUrl(baseURL + pageURL);
  if ($ === null) return;

  const pageHyperlinks = [];
  $('#mw-content-text a:not(.image)').each((idx, el) => {
    const { title, href } = el.attribs;

    if (title && href.startsWith('/wiki/')) {
      graphWikiPages.get(pageTitle).links.push(title);

      if (!graphWikiPages.has(title)) {
        graphWikiPages.set(title, { href, links: [] });
        pageHyperlinks.push({ title, href });
      }
    }
  });

  const promises = [];
  pageHyperlinks.forEach(async ({ title, href }) => {
    if (count < MAXPAGES) {
      promises.push(scrapeWiki(title, href));
    }
  });

  await Promise.all(promises);
};

scrapeInit();
