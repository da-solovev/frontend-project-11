import axios, { AxiosError } from "axios";
import { generateProxyUrl } from './utils/proxy.js'
import state from './model.js'
import onChange from "on-change";
import { parseRSS } from "./utils/parse.js";

const watchedUrl = {
  urlList: [],
  status: 'off',
};

const watch = (urlList) => {
  const watchedUrls = urlList.map((url) => {
    return axios.get(url)

    //добавить catch с обработкой сетевых ошибок и парсинга
  })
  Promise.all(watchedUrls)
  .then((responces) => {
    const parseData = responces.map((responce) => parseRSS(responce.data.contents));
    console.log(parseData);
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

const watchRssStream = (url) => {
  /*
  Берем исходное состояние для фида (посты)
  Каждые 5 сек получаем новые данные
    если новые данные равны с исходными - ничего не делаем
    если новые данные отличаются от исходных - ищем пересечение (только новые) и добавляем их в state
  Новое состояние записываем в исходное состояние
   */
}


export const watchedNetwork = onChange(watchedUrl, startWatch);