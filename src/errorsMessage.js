import { AxiosError } from 'axios';
import { ValidationError } from 'yup';
import { ParseError } from './utils/parse.js';

const getErrorMessage = (error, i18nextInstance) => {
  switch (true) {
    case error instanceof ValidationError:
      return error.message;
    case error instanceof AxiosError:
      return i18nextInstance.t('errors.networkError');
    case error instanceof ParseError:
      return i18nextInstance.t('errors.parseRSSError');
    default:
      return i18nextInstance.t('errors.unknownError');
  }
};

export default getErrorMessage;
