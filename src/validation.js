import * as yup from 'yup';

const validateUrl = async (i18nextInstance, url, addedUrl = []) => {
  yup.setLocale({
    mixed: {
      notOneOf: i18nextInstance.t('errors.noUniqueUrl'),
    },
    string: {
      url: i18nextInstance.t('errors.noValidUrl'),
    },
  });

  const schema = yup.string()
    .notOneOf(addedUrl)
    .url();
  return schema.validate(url);
};

export default validateUrl;
