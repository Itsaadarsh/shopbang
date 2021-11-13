import express from 'express';
import validationMiddleware from '../../middleware/validation/validationRegister';
import { validationResult } from 'express-validator';
import userModel from '../../models/bangUsers';
import register from '../../utils/registerUserLogic';
import tokenValue from '../../utils/bangTokenValue';

const router = express.Router();

router.post('/register/:id', validationMiddleware(), async (req: express.Request, res: express.Response) => {
  try {
    const valiErrors = validationResult(req);
    if (!valiErrors.isEmpty()) {
      res.status(400).json({ error: true, data: { message: valiErrors.array() } });
      return;
    }

    const id = req.params.id;
    const referralUser = await userModel.findOne({ _id: id });
    if (!referralUser) {
      res.status(400).json({ error: true, data: { message: `Incorrect Referral` } });
      return;
    }

    if (await register(req, res)) {
      referralUser.referralCount += 1;
      referralUser.bangToken += tokenValue.referral;
      await referralUser.save();
    }
    return;
  } catch (err) {
    res.status(400).json({ error: true, data: { message: err.message } });
  }
});

export { router as referralRegister };
