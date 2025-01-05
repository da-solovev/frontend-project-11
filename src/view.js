import onChange from "on-change";
import state from './model.js'

const createFeedsList = (feeds) => {
  const ul = document.createElement('ul');
  feeds.forEach((feed) => {
    const li = document.createElement('li');
    const title = document.createElement('h3');
    title.textContent = feed.title;
    const description = document.createElement('p');
    description.textContent = feed.description;
    li.append(title);
    li.append(description);
    ul.append(li);
  })
  return feeds.length > 0 ? ul : null;
}

const createPostsList = (posts) => {
  const ul = document.createElement('ul');
  posts.forEach((post) => {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.textContent = post.title;
    link.setAttribute('href', post.link);
    const button = document.createElement('button');
    button.textContent = 'Просмотр';
    li.append(link);
    li.append(button);
    ul.append(li);
  })
  return posts.length > 0 ? ul : null;
}

export class View {
  render(path, value) {
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
      if (state.rssForm.state === 'filling') {
        input.classList.remove('is-invalid');
        feedback.textContent = '';
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
  }
}

const view = new View();
export const watchedState = onChange(state, view.render);
