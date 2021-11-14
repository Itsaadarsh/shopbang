import { body } from 'express-validator';

export default module.exports = () => {
  return [body('review').trim().isLength({ min: 1 }).withMessage('Empty review not allowed')];
};
