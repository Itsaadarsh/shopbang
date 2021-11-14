import { body } from 'express-validator';

export default module.exports = () => {
  return [
    body('username').trim().blacklist(' ').toLowerCase(),
    body('password')
      .trim()
      .isLength({ min: 5, max: 30 })
      .withMessage('Password must be between 5 - 20 characters'),
  ];
};
