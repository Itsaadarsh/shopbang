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
        if (value[i].length > 0) {
          user.twitterId = value[i];
          tempBangToken += tokenValue.updateUserDetails;
        }
        continue;
      } else if (key[i] == 'instagramId') {
        if (value[i].length > 0) {
          user.instagramId = value[i];
          tempBangToken += tokenValue.updateUserDetails;
        }
        continue;
      } else if (key[i] == 'nationality') {
        if (value[i].length > 0) {
          user.nationality = value[i];
          tempBangToken += tokenValue.updateUserDetails;
        }
        continue;
      } else {
        res.status(400).json({ error: true, data: { message: [`Something went wrong, try again!`] } });
        return;
      }
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
