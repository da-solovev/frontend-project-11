export class ParseError {};

export const parseRSS = (string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(string, "application/xml");
  if (doc.querySelector('parsererror')) {
    throw new ParseError()
  }
  const title = doc.querySelector('title').textContent;
  const description = doc.querySelector('description').textContent;
  const itemsNodeList = doc.querySelectorAll('item');
  const items = [];
  itemsNodeList.forEach((item) => {
    const title = item.querySelector('title').textContent;
    const description = item.querySelector('description').textContent;
    const link = item.querySelector('link').textContent;
    items.push({ title, description, link }); 
  })
  return {
    title,
    description,
    items,
  }
}