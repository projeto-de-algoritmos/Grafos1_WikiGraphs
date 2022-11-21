import json from './dump/graph_titles.json';

const findWikiPathWithBFS = async (startPageTitle, endPageTitle) => {
  const data = new Map(Object.entries(json));
  const bfsQueue = [[startPageTitle, [startPageTitle]]];

  while (bfsQueue.length) {
    const [title, path] = bfsQueue.shift();

    const linkedPages = data.get(title).links;
    for (const pageTitle of linkedPages) {
      const newPath = path.concat(pageTitle);
      if (pageTitle === endPageTitle) {
        console.log(newPath);
        return newPath;
      }

      bfsQueue.push([pageTitle, newPath]);
    }
  }

  return [];
};

findWikiPathWithBFS('Wikipédia', 'Prenome');
