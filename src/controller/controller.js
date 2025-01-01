import validateUrl from "./validation.js";
import { watchedState } from "../view.js";

export default () => {
  const rssInputForm = document.querySelector('form.rss-form');
  const input = document.querySelector('#url-input');

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const link = formData.get('url');
    validateUrl(link, watchedState.rssForm.links)
      .then(() => {
        watchedState.rssForm.state = 'sending';
        watchedState.rssForm.links = [watchedState.rssForm.links, formData.get('url')];
        rssInputForm.reset();
        input.focus();
      })
      .catch((err) => {
        watchedState.rssForm.error = err.message;
        watchedState.rssForm.state = 'error';
      })


    
  }
  
  rssInputForm.addEventListener('submit', (e) => handleSubmitForm(e));
}

