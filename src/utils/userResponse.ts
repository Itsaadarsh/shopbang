import express from 'express';
import { USER } from '../models/bangUsers';

const userResponse = (res: express.Response, user: USER) => {
  return res.status(201).json({
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
      referralCount: user?.referralCount,
    },
  });
};

export default userResponse;
