import axios from 'axios';
import onChange from 'on-change';
import state from './model.js';
import { parseRSS, generateNewPosts } from './utils/parse.js';
import { watchedState } from './view.js';

const watcherRssChannels = {
  urls: [],
  status: 'off',
};

const watch = (urls) => {
  const watchedChannels = urls.map((url) => axios.get(url)
    .catch((err) => {
      throw err;
    }));
  Promise.all(watchedChannels)
    .then((responces) => {
      const parseData = responces.map((responce) => parseRSS(responce.data.contents));
      parseData.forEach((channel) => {
        const currentFeed = state.data.feeds.find((item) => item.title === channel.feed.feedTitle);
        const addedPosts = state.data.posts.filter((post) => post.feedId === currentFeed.id);
        const postsFromResponce = channel.posts;
        const updatedPosts = postsFromResponce
          .filter((newPost) => !addedPosts.find((oldPost) => oldPost.title === newPost.postTitle));
        const newPosts = generateNewPosts({ posts: updatedPosts }, currentFeed.id);
        watchedState.data.posts = [...newPosts, ...watchedState.data.posts];
      });
    })
    .then(() => setTimeout(() => watch(urls), 5000));
};

const startWatch = (path) => {
  if (path === 'urls') {
    watcherRssChannels.status = 'on';
    watch(watcherRssChannels.urls);
  }
};

const watchChannels = onChange(watcherRssChannels, startWatch);

export default watchChannels;
