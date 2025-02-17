import onChange from 'on-change';
import state from './model.js';

const addClasses = (node, classes = []) => {
  classes.forEach((className) => {
    node.classList.add(className);
  });
};

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
    const titleFeed = document.createElement('h3');
    titleFeed.classList.add('h6');
    titleFeed.textContent = feed.title;
    const descriptionFeed = document.createElement('p');
    addClasses(descriptionFeed, ['small', 'text-black-50']);
    descriptionFeed.textContent = feed.description;
    li.append(titleFeed);
    li.append(descriptionFeed);
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
    const readClass = state.uiState.readPosts.find((item) => item === post.id) ? 'fw-normal' : 'fw-bold';
    link.classList.add(readClass);
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
  static render(path) {
    if (path === 'rssForm.state' || path === 'rssForm.error') {
      const input = document.querySelector('#url-input');
      const feedback = document.querySelector('.feedback');
      const rssInputForm = document.querySelector('form.rss-form');
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
        rssInputForm.reset();
        input.focus();
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
    if (path === 'uiState.openPost') {
      const post = state.data.posts.find((item) => item.id === state.uiState.openPost);
      const modalTitle = document.querySelector('.modal-title');
      const modalDescription = document.querySelector('.modal-body');
      const modalLinkBtn = document.querySelector('.modal-footer a');
      modalTitle.textContent = post.title;
      modalDescription.textContent = post.description;
      modalLinkBtn.setAttribute('href', post.link);
    }
  }
}

export const watchedState = onChange(state, View.render);
