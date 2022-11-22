import json from './dump/10k.json';

const findWikiPathWithBFS = (startPageTitle, endPageTitle) => {
  const data = new Map(Object.entries(json));
  const bfsQueue = [[startPageTitle, [startPageTitle]]];

  while (bfsQueue.length) {
    const [title, path] = bfsQueue.shift();

    const linkedPages = data.get(title).links;
    for (const pageTitle of linkedPages) {
      const newPath = path.concat(pageTitle);
      if (pageTitle === endPageTitle) {
        return newPath;
      }

      bfsQueue.push([pageTitle, newPath]);
    }
  }

  return [];
};

export default findWikiPathWithBFS;
