import validateUrl from "./utils/validation.js";
import { watchedState } from "./view.js";
import axios, { AxiosError } from "axios";
import { ValidationError } from 'yup';
import { generateProxyUrl } from './utils/proxy.js'
import { ParseError, parseRSS } from "./utils/parse.js";
import uniqueId from 'lodash/uniqueId.js';
import { watchedNetwork } from './network.js';


export default () => {
  const rssInputForm = document.querySelector('form.rss-form');
  const input = document.querySelector('#url-input');

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const link = formData.get('url');
    const proxyUrl = generateProxyUrl(link);
    validateUrl(link, watchedState.rssForm.links)
      .then(() => {
        watchedState.rssForm.state = 'sending';
        return axios.get(proxyUrl);
      })
      .then((response) => {
        const parseData = parseRSS(response.data.contents);
        const feedId = uniqueId();
        const newFeed = {
          id: feedId,
          title: parseData.title,
          description: parseData.description,
          link: proxyUrl,
        };
        const postsList = parseData.items.map((item) => {
          return {
            id: uniqueId(),
            feedId: feedId,
            title: item.title,
            description: item.description,
            link: item.link,
          }
        });
        watchedState.data.feeds.unshift(newFeed);
        watchedState.data.posts = postsList.concat(watchedState.data.posts);
      })
      .then(() => {
        //убрать + переделать проверку на уникальность
        watchedState.rssForm.links.push(formData.get('url'));
        ///////////
        watchedNetwork.urlList.push(proxyUrl.href);
        rssInputForm.reset();
        input.focus();
      })
      .catch((err) => {
        watchedState.rssForm.state = 'error';
        // сделать через switch
        if (err instanceof ValidationError) {
          watchedState.rssForm.error = err.message;
        } else if (err instanceof AxiosError) {
          watchedState.rssForm.error = 'Ошибка сети';
        } else if (err instanceof ParseError) {
          watchedState.rssForm.error = 'Ресурс не содержит валидный RSS';
        } else {
          throw err
        }
      })

      const clickBtnHandler = (e) => {
        if (!e.target.closest('button')) {
          return;
        }
        const post = watchedState.data.posts.find((item) => item.id === e.target.dataset.id);
        const modalTitle = document.querySelector('.modal-title');
        const modalDescription = document.querySelector('.modal-body');
        modalTitle.textContent = post.title;
        modalDescription.textContent = post.description;
        if (!watchedState.uiState.readPosts.find((item) => item === e.target.dataset.id)) {
          watchedState.uiState.readPosts.push(e.target.dataset.id);
        }
      }

      const clickLinkHandler = (e) => {
        if (!e.target.closest('a')) {
          return;
        }
        if (!watchedState.uiState.readPosts.find((item) => item === e.target.dataset.id)) {
          watchedState.uiState.readPosts.push(e.target.dataset.id);
        }
      }

      const postsContainer = document.querySelector('div.posts');
      postsContainer.addEventListener('click', (e) => clickBtnHandler(e));
      postsContainer.addEventListener('click', (e) => clickLinkHandler(e));
  }

  


  
  rssInputForm.addEventListener('submit', (e) => handleSubmitForm(e));
  
}

