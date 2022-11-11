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
    const encodedURL = encodeURI(url);
    const { data } = await axios.get(encodedURL);
    return cheerio.load(data);
  } catch (error) {
    // console.log(error);
    // console.log(url);
    return null;
  }
};

const getGraphFromWikiPages = (
  parentTitle,
  links,
  graphTitleWikiPages,
  mapTitlesToLinks,
) => {
  const filteredLinks = [];

  links.each((idx, el) => {
    const { title } = el.attribs;
    const link = el.attribs.href;

    if (
      title &&
      title[0] !== '[' &&
      !title.includes(':') &&
      !link.includes('http')
    ) {
      if (graphTitleWikiPages.get(title)) {
        graphTitleWikiPages.set(title, [...graphTitleWikiPages.get(title)]);
      } else graphTitleWikiPages.set(title, []);

      if (graphTitleWikiPages.get(parentTitle)) {
        graphTitleWikiPages.set(parentTitle, [
          ...graphTitleWikiPages.get(parentTitle),
          title,
        ]);
      }

      mapTitlesToLinks.set(title, link);
      filteredLinks.push(link);
    }
  });

  return filteredLinks;
};

const getKeyByValue = (map, searchValue) => {
  for (const [key, value] of map.entries()) {
    if (value === searchValue) return key;
  }

  return null;
};

// const returnGraph = graph => {

//   for
//   return graph
// }

module.exports = {
  writeMapToFile,
  fetchUrl,
  getGraphFromWikiPages,
  getKeyByValue,
};
