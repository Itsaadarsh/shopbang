import { validationResult } from 'express-validator';
import express from 'express';

const validate = (req: express.Request, res: express.Response) => {
  const valiErrors = validationResult(req);
  if (!valiErrors.isEmpty()) {
    const errArr: Array<string> = [];
    valiErrors.array().forEach(err => {
      errArr.push(err.msg);
    });
    res.status(400).json({ error: true, data: { message: errArr } });
    return true;
  }
  return false;
};

export default validate;
