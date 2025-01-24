import uniqueId from 'lodash/uniqueId.js';

export class ParseError {}

export const parseRSS = (string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(string, 'application/xml');
  if (doc.querySelector('parsererror')) {
    throw new ParseError();
  }
  const feedTitle = doc.querySelector('title')?.textContent || '';
  const feedDescription = doc.querySelector('description')?.textContent || '';
  const itemsNodeList = doc.querySelectorAll('item');
  let posts = [];
  itemsNodeList.forEach((item) => {
    const postTitle = item.querySelector('title')?.textContent || '';
    const postDescription = item.querySelector('description')?.textContent || '';
    const postLink = item.querySelector('link')?.textContent || '';
    posts = [...posts, { postTitle, postDescription, postLink }];
  });
  return {
    feed: {
      feedTitle,
      feedDescription,
    },
    posts,
  };
};

export const generateNewFeed = (data, link) => {
  const feedId = uniqueId('feed_');
  return {
    id: feedId,
    title: data.feed.feedTitle,
    description: data.feed.feedDescription,
    link,
  };
};

export const generateNewPosts = (data, feedId) => {
  const postsList = data.posts.map((post) => ({
    id: uniqueId('post_'),
    feedId,
    title: post.postTitle,
    description: post.postDescription,
    link: post.postLink,
  }));
  return postsList;
};
