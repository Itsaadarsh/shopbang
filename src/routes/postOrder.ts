import express from 'express';
import validationMiddleware from '../middleware/validation/order';
import userModel from '../models/bangUsers';
import auth from '../middleware/auth';
import validate from '../utils/validationError';

const router = express.Router();

router.post('/order', auth, validationMiddleware(), async (req: express.Request, res: express.Response) => {
  try {
    if (validate(req, res)) {
      return;
    }

    const { price }: { price: number } = req.body;
    const user = await userModel.findOne({ _id: req.user!.userid });

    if (!user) {
      res.status(400).json({ error: true, data: { message: [`Something went wrong`] } });
      return;
    }

    if (price > user.bangToken) {
      res.status(400).json({ error: true, data: { message: [`Insufficient Bang Tokens`] } });
      return;
    }

    user.bangToken -= +price;
    await user.save();

    res.status(201).json({
      error: false,
      data: {
        id: user?.id,
        bangToken: user?.bangToken,
      },
    });
  } catch (err) {
    res.status(400).json({ error: true, data: { message: [err.message] } });
  }
});

export { router as postOrder };
