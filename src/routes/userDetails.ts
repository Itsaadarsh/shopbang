import express from 'express';
import auth from '../middleware/auth';
import userModel from '../models/bangUsers';

const router = express.Router();

router.get('/user', auth, async (req: express.Request, res: express.Response) => {
  try {
    const user = await userModel.findOne({ _id: req.user!.userid });
    if (!user) {
      res.status(400).json({ error: true, data: { message: `Something went wrong` } });
    }

    res.status(201).json({
      error: false,
      data: {
        id: user?.id,
        username: user?.username,
        email: user?.email,
        phoneno: user?.phoneno,
        twitterId: user?.twitterId,
        instagramId: user?.instagramId,
        nationality: user?.nationality,
        bangToken: user?.bangToken,
      },
    });
  } catch (err) {
    res.status(400).json(err.message);
  }
});

export { router as getUser };
