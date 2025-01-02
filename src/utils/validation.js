import * as yup from 'yup';
import i18next from 'i18next';

const validateUrl = async (url, addedUrl = []) => {
  yup.setLocale({
    mixed: {
      notOneOf: i18next.t('errors.noUniqueUrl'),
    },
    string: {
      url: i18next.t('errors.noValidUrl'),
    },
  });

  const schema = yup.string()
    .notOneOf(addedUrl)
    .url();

  return schema.validate(url);
}

export default validateUrl;