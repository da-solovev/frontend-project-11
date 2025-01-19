import onChange from 'on-change';
import state from './model.js';
import addClasses from './utils/editDOMHelpers.js';

const createFeedsList = (feeds) => {
  const container = document.createElement('div');
  addClasses(container, ['card', 'border-0']);
  const containerTitle = document.createElement('div');
  containerTitle.classList.add('card-body');
  const title = document.createElement('h2');
  title.textContent = 'Фиды';
  addClasses(title, ['card-title', 'h4']);
  containerTitle.append(title);
  container.append(containerTitle);
  const ul = document.createElement('ul');
  addClasses(ul, ['list-group', 'border-0']);
  feeds.forEach((feed) => {
    const li = document.createElement('li');
    addClasses(li, ['list-group-item', 'border-0']);
    const title = document.createElement('h3');
    title.classList.add('h6');
    title.textContent = feed.title;
    const description = document.createElement('p');
    addClasses(description, ['small', 'text-black-50']);
    description.textContent = feed.description;
    li.append(title);
    li.append(description);
    ul.append(li);
  });
  container.append(ul);
  return feeds.length > 0 ? container : null;
};

const createPostsList = (posts) => {
  const container = document.createElement('div');
  addClasses(container, ['card', 'border-0']);
  const containerTitle = document.createElement('div');
  containerTitle.classList.add('card-body');
  const title = document.createElement('h2');
  title.textContent = 'Посты';
  addClasses(title, ['card-title', 'h4']);
  containerTitle.append(title);
  container.append(containerTitle);
  const ul = document.createElement('ul');
  addClasses(ul, ['list-group', 'border-0']);
  posts.forEach((post) => {
    const li = document.createElement('li');
    addClasses(li, ['list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0']);
    const link = document.createElement('a');
    link.textContent = post.title;
    link.setAttribute('href', post.link);
    link.setAttribute('data-id', post.id);
    link.setAttribute('target', '_blank');
    watchedState.uiState.readPosts.find((item) => item === post.id)
      ? link.classList.add('fw-normal')
      : link.classList.add('fw-bold');
    const button = document.createElement('button');
    addClasses(button, ['btn', 'btn-outline-primary', 'btn-sm']);
    button.setAttribute('type', 'button');
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#Modal');
    button.setAttribute('data-id', post.id);
    button.textContent = 'Просмотр';
    li.append(link);
    li.append(button);
    ul.append(li);
  });
  container.append(ul);
  return posts.length > 0 ? container : null;
};

export class View {
  render(path) {
    if (path === 'rssForm.state' || path === 'rssForm.error') {
      const input = document.querySelector('#url-input');
      const feedback = document.querySelector('.feedback');
      input.classList.remove('is-invalid');
      feedback.classList.remove('text-danger');
      if (state.rssForm.state === 'error') {
        input.classList.add('is-invalid');
        feedback.classList.add('text-danger');
        feedback.textContent = state.rssForm.error;
      }
      if (state.rssForm.state === 'sending') {
        feedback.textContent = '';
      }
      if (state.rssForm.state === 'filling') {
        feedback.textContent = '';
      }
      if (state.rssForm.state === 'successful') {
        feedback.classList.add('text-success');
        feedback.textContent = 'RSS успешно загружен';
      }
    }
    if (path === 'data.feeds') {
      const feeds = document.querySelector('div.feeds');
      const feedsList = createFeedsList(state.data.feeds);
      feeds.innerHTML = '';
      feeds.append(feedsList);
    }
    if (path === 'data.posts') {
      const posts = document.querySelector('div.posts');
      const postsList = createPostsList(state.data.posts);
      posts.innerHTML = '';
      posts.append(postsList);
    }
    if (path === 'uiState.readPosts') {
      const posts = document.querySelector('div.posts');
      const postsList = createPostsList(state.data.posts);
      posts.innerHTML = '';
      posts.append(postsList);
    }
  }
}

const view = new View();
export const watchedState = onChange(state, view.render);
