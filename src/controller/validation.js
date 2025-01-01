import * as yup from 'yup';

const validateUrl = async (url, addedUrl = []) => {
  const schema = yup.string()
    .notOneOf(addedUrl, 'RSS уже существует')
    .url('Ссылка должна быть валидным URL');

  return schema.validate(url);
}

export default validateUrl;