import axios, { AxiosError } from "axios";
import { generateProxyUrl } from './utils/proxy.js'
import state from './model.js'
import onChange from "on-change";
import { parseRSS } from "./utils/parse.js";
import uniqueId from 'lodash/uniqueId.js';
import { watchedState } from "./view.js";

const watchedChannels = {
  urlList: [],
  status: 'off',
};

const watch = (urlList) => {
  const watchedChannelss = urlList.map((url) => {
    return axios.get(url)
    //добавить catch с обработкой сетевых ошибок и парсинга
  })
  Promise.all(watchedChannelss)
  .then((responces) => {
    const parseData = responces.map((responce) => parseRSS(responce.data.contents));
    parseData.forEach((channel) => {
      const currentFeed = state.data.feeds.find((item) => item.title === channel.title);
      const postsFromState = state.data.posts.filter((post) => post.feedId === currentFeed.id);
      const postsFromChannel = channel.items;
      postsFromChannel.forEach((post) => {
        if(!postsFromState.find((oldPost) => oldPost.title === post.title)) {
          const newPost = {
            id: uniqueId(),
            feedId: currentFeed.id,
            title: post.title,
            description: post.description,
            link: post.link,
          }
          watchedState.data.posts.unshift(newPost);
        }
      })
    })
  })
  .then(() => setTimeout(() => watch(urlList), 5000));
}

const startWatch = (path, value, prevValue) => {
  if (path === 'urlList') {
    watchedNetwork.status = 'on';
  }
  if (path === 'status') {
    console.log('start')
    watch(watchedNetwork.urlList);
  }
}

export const watchedNetwork = onChange(watchedChannels, startWatch);