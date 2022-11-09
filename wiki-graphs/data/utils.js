const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const { resolve } = require('path');

const writeMapTitlesFromLinksToFile = data => {
  fs.writeFileSync(
    resolve(__dirname, 'dump', 'titles_links.json'),
    JSON.stringify(Object.fromEntries(data), null, 4),
  );
};

const fetchUrl = async url => {
  console.log(`Fetching '${encodeURI(url)}' ...`);

  const encodedURL = encodeURI(url);
  const { data } = await axios.get(encodedURL);
  return cheerio.load(data);
};

const getGraphFromWikiPages = (links, graphWikiPages) => {
  links.each((idx, el) => {
    const text = el.attribs.title;

    if (text && text[0] !== '[' && !text.includes(':'))
      graphWikiPages.set(text, []);
  });
};

module.exports = {
  writeMapTitlesFromLinksToFile,
  fetchUrl,
  getGraphFromWikiPages,
};
