import { body } from 'express-validator';

export default module.exports = () => {
  return [body('price').isNumeric().withMessage('Price should be a number')];
};
