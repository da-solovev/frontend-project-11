import axios from 'axios';
import validateUrl from './validation.js';
import { watchedState } from './view.js';
import generateProxyUrl from './utils/proxy.js';
import { parseRSS, generateNewFeed, generateNewPosts } from './utils/parse.js';
import watchChannels from './network.js';
import getErrorMessage from './errorsMessage.js';

export default (i18nextInstance) => {
  const rssInputForm = document.querySelector('form.rss-form');

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    const proxyUrl = generateProxyUrl(url);
    validateUrl(i18nextInstance, url, watchChannels.urls)
      .then(() => {
        watchedState.rssForm.state = 'sending';
        return axios.get(proxyUrl);
      })
      .then((response) => {
        const parseData = parseRSS(response.data.contents);
        const newFeed = generateNewFeed(parseData, url);
        const newPosts = generateNewPosts(parseData, newFeed.id);
        watchedState.data.feeds = [newFeed, ...watchedState.data.feeds];
        watchedState.data.posts = [...newPosts, ...watchedState.data.posts];
        watchChannels.urls = [...watchChannels.urls, url];
        watchedState.rssForm.state = 'successful';
      })
      .catch((err) => {
        watchedState.rssForm.state = 'error';
        const errorMessage = getErrorMessage(err, i18nextInstance);
        watchedState.rssForm.error = errorMessage;
      });
  };

  const clickBtnHandler = (e) => {
    if (!e.target.closest('button')) {
      return;
    }
    watchedState.uiState.openPost = e.target.dataset.id;
    if (!watchedState.uiState.readPosts.find((item) => item === e.target.dataset.id)) {
      watchedState.uiState.readPosts = [...watchedState.uiState.readPosts, e.target.dataset.id];
    }
  };

  const clickLinkHandler = (e) => {
    if (!e.target.closest('a')) {
      return;
    }
    if (!watchedState.uiState.readPosts.find((item) => item === e.target.dataset.id)) {
      watchedState.uiState.readPosts = [...watchedState.uiState.readPosts, e.target.dataset.id];
    }
  };

  const postsContainer = document.querySelector('div.posts');
  postsContainer.addEventListener('click', (e) => clickBtnHandler(e));
  postsContainer.addEventListener('click', (e) => clickLinkHandler(e));
  rssInputForm.addEventListener('submit', (e) => handleSubmitForm(e));
};
