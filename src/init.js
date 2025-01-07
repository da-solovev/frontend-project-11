import i18next from "i18next";
import  './style/styles.scss';
import controller from './controller.js';
import ru from './locales/ru.js';
import en from './locales/en.js'
import state from './model.js';

export default async () => {
  i18next.init({
    lng: state.locale,
    resources: {
      ru,
      en,
    },
  });

  controller();
  
}