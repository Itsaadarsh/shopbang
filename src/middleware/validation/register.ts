import { body } from 'express-validator';

export default module.exports = () => {
  return [
    body('username').trim().blacklist(' ').toLowerCase(),
    body('email').isEmail().withMessage('Incorrect EMAIL format.'),
    body('password')
      .trim()
      .isLength({ min: 5, max: 30 })
      .withMessage('Password must be between 5 - 20 characters'),
    body('phoneno').isMobilePhone('en-IN').withMessage('Incorrect PHONE NUMBER format.'),
  ];
};
