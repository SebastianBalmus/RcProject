import * as Yup from 'yup';

const uriValidator = Yup
  .string()
  .url()
  .matches(/.(com|ro|net|org|gov)/)
  .required();
const validateUri = (uri: string) => uriValidator.isValid(uri);

export default validateUri;
