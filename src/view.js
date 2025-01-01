import onChange from "on-change";
import state from './model.js'


export class View {
  render(path, value) {
    console.log(path, value)
    if (path === 'rssForm.state' || path === 'rssForm.error') {
      const input = document.querySelector('#url-input');
      const feedback = document.querySelector('.feedback');
      if (state.rssForm.state === 'error') {
        input.classList.add('is-invalid');
        feedback.textContent = state.rssForm.error;
      }
      if (state.rssForm.state === 'sending') {
        input.classList.remove('is-invalid');
        feedback.textContent = '';
      }
      if (state.rssForm.state === 'waiting') {
        input.classList.remove('is-invalid');
        feedback.textContent = '';
      }
    }
  }
}
  
export const watchedState = onChange(state, new View().render);
