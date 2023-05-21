import * as Yup from 'yup';

const textValidator = Yup
  .string()
  .min(3)
  .max(20)
  .matches(/[^.comrgv]$/)
  .required();
const validateUri = (text: string) => textValidator.isValid(text);

export default validateUri;
