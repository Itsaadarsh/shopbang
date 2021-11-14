import express from 'express';
import reviewModel from '../models/reviewProduct';

const router = express.Router();

router.get('/review/:pid', async (req: express.Request, res: express.Response) => {
  try {
    const pid = req.params.pid;
    const reviews = await reviewModel.find({ productId: pid });
    if (reviews.length == 0) {
      res.status(400).json({ error: true, data: { message: [`No Reviews Found`] } });
      return;
    }
    res.status(201).json({
      error: false,
      data: { reviews },
    });
    return;
  } catch (err) {
    res.status(400).json({ error: true, data: { message: [err.message] } });
    return;
  }
});

export { router as getReview };
