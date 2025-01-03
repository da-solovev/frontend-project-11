import validateUrl from "./utils/validation.js";
import { watchedState } from "./view.js";
import axios, { AxiosError } from "axios";
import { ValidationError } from 'yup';


export default () => {
  const rssInputForm = document.querySelector('form.rss-form');
  const input = document.querySelector('#url-input');

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const link = formData.get('url');
    validateUrl(link, watchedState.rssForm.links)
      .then(() => watchedState.rssForm.state = 'sending')
      .then(() => axios.get(link))
      .then(() => {
        watchedState.rssForm.links.push(formData.get('url'));
        rssInputForm.reset();
        input.focus();
      })
      .catch((err) => {
        watchedState.rssForm.state = 'error';
        if (err instanceof ValidationError) {
          watchedState.rssForm.error = err.message;
        }
        if (err instanceof AxiosError) {
          watchedState.rssForm.error = 'Ошибка сети';
        }
      })
  }
  
  rssInputForm.addEventListener('submit', (e) => handleSubmitForm(e));
}

