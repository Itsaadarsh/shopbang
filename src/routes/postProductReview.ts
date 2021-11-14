import reviewProductSchema from '../models/reviewProduct';
import express from 'express';
import validationMiddleware from '../middleware/validation/review';
import userModel from '../models/bangUsers';
import auth from '../middleware/auth';
import validate from '../utils/validationError';
import mongoose from 'mongoose';
import tokenValue from '../utils/bangTokenValue';

const router = express.Router();

router.post(
  '/review/:pid',
  auth,
  validationMiddleware(),
  async (req: express.Request, res: express.Response) => {
    try {
      if (validate(req, res)) {
        return;
      }

      const pid = req.params.pid;
      const { review }: { review: string } = req.body;
      const user = await userModel.findOne({ _id: req.user!.userid });

      if (!user) {
        res.status(400).json({ error: true, data: { message: [`Something went wrong`] } });
        return;
      }

      const insertReview = new reviewProductSchema({
        _id: new mongoose.Types.ObjectId(),
        productId: pid,
        username: user.username,
        review,
      });

      const finalReview = await insertReview.save();

      user.bangToken += tokenValue.review;
      await user.save();

      res.status(200).json({
        error: false,
        data: {
          id: insertReview._id,
          username: finalReview.username,
          review: finalReview.review,
          bangToken: user.bangToken,
        },
      });
      return;
    } catch (err) {
      res.status(400).json({ error: true, data: { message: [err.message] } });
    }
  }
);

export { router as reviewProduct };
