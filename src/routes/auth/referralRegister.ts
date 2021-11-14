import express from 'express';
import validationMiddleware from '../../middleware/validation/register';
import userModel from '../../models/bangUsers';
import register from '../../utils/registerUserLogic';
import tokenValue from '../../utils/bangTokenValue';
import validate from '../../utils/validationError';

const router = express.Router();

router.post('/register/:id', validationMiddleware(), async (req: express.Request, res: express.Response) => {
  try {
    if (validate(req, res)) {
      return;
    }

    const id = req.params.id;
    const referralUser = await userModel.findOne({ _id: id });
    if (!referralUser) {
      res.status(400).json({ error: true, data: { message: [`Incorrect Referral`] } });
      return;
    }

    if (await register(req, res)) {
      referralUser.referralCount += 1;
      referralUser.bangToken += tokenValue.referral;
      await referralUser.save();
    }
    return;
  } catch (err) {
    res.status(400).json({ error: true, data: { message: [err.message] } });
  }
});

export { router as referralRegister };
