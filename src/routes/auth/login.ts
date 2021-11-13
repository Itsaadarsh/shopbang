import express from 'express';
import bcrypt from 'bcrypt';
import validationMiddleware from '../../middleware/validation/validationLogin';
import { validationResult } from 'express-validator';
import userModel from '../../models/bangUsers';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', validationMiddleware(), async (req: express.Request, res: express.Response) => {
  try {
    const valiErrors = validationResult(req);
    if (!valiErrors.isEmpty()) {
      res.status(400).json({ error: true, data: { message: valiErrors.array() } });
      return;
    }

    const { username, password }: { username: string; password: string } = req.body;
    const isUsernamelAvai = await userModel.findOne({ username });

    if (isUsernamelAvai === null) {
      res.status(400).json({ error: true, data: { message: `'${username}' username does not exists` } });
      return;
    }

    bcrypt.compare(password, isUsernamelAvai.password, (err, hash) => {
      if (err || hash === false) {
        res.status(400).json({ error: true, data: { message: `Incorrect Password, Try Again!` } });
        return;
      }

      const token: string = jwt.sign({ userid: isUsernamelAvai._id }, process.env.JWT_TOKEN!, {
        expiresIn: '24h',
      });

      res.status(201).json({
        error: false,
        data: {
          token,
        },
      });
      return;
    });
  } catch (err) {
    res.status(400).json({ error: true, data: { message: err.message } });
  }
});

export { router as login };
