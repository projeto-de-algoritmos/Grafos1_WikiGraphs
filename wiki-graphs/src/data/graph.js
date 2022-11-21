const { scrapeWikiPage } = require('./crawler');

const findWikiPathWithBFS = async (startPageTitle, endPageTitle) => {
  const startNode = {
    title: startPageTitle,
    link: encodeURI(`/wiki/${startPageTitle}`),
  };
  const bfsQueue = [[startNode, [startNode]]];

  while (bfsQueue.length) {
    const [node, path] = bfsQueue.shift();

    const pageHyperlinks = await scrapeWikiPage(node.link);
    for (const page of pageHyperlinks) {
      const newPath = path.concat(page);
      if (page.title === endPageTitle) {
        console.log(newPath);
        return newPath;
      }

      bfsQueue.push([page, newPath]);
    }
  }
};

findWikiPathWithBFS('Wikipédia', 'Nome próprio');
