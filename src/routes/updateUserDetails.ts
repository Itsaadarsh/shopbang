import express from 'express';
import userResponse from '../utils/userResponse';
import auth from '../middleware/auth';
import userModel from '../models/bangUsers';
import tokenValue from '../utils/bangTokenValue';

const router = express.Router();

router.patch('/user', auth, async (req: express.Request, res: express.Response) => {
  try {
    const user = await userModel.findOne({ _id: req.user!.userid });
    if (!user) {
      res.status(400).json({ error: true, data: { message: [`Something went wrong`] } });
      return;
    }

    const { key, value }: { key: Array<string>; value: Array<string> } = req.body;
    let tempBangToken = user.bangToken;

    for (let i = 0; i < key.length; i++) {
      if (key[i] == 'twitterId') {
        user.twitterId = value[i];
      } else if (key[i] == 'instagramId') {
        user.instagramId = value[i];
      } else if (key[i] == 'nationality') {
        user.nationality = value[i];
      } else {
        res.status(400).json({ error: true, data: { message: [`Something went wrong, try again!`] } });
        return;
      }
      tempBangToken += tokenValue.updateUserDetails;
    }

    user.bangToken = tempBangToken;
    const updatedUser = await user.save();
    return userResponse(res, updatedUser);
  } catch (err) {
    res.status(400).json({ error: true, data: { message: [err.message] } });
    return;
  }
});

export { router as updateUser };
