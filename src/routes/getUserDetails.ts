import express from 'express';
import auth from '../middleware/auth';
import userResponse from '../utils/userResponse';
import userModel from '../models/bangUsers';

const router = express.Router();

router.get('/user', auth, async (req: express.Request, res: express.Response) => {
  try {
    const user = await userModel.findOne({ _id: req.user!.userid });
    if (!user) {
      res.status(400).json({ error: true, data: { message: [`Something went wrong`] } });
      return;
    }
    return userResponse(res, user);
  } catch (err) {
    res.status(400).json({ error: true, data: { message: [err.message] } });
    return;
  }
});

export { router as getUser };
