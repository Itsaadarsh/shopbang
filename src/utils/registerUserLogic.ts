import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import userModel from '../models/bangUsers';
import jwt from 'jsonwebtoken';
import tokenValue from './bangTokenValue';

const register = async (req: express.Request, res: express.Response) => {
  const {
    username,
    email,
    password,
    phoneno,
  }: { username: string; email: string; password: string; phoneno: number } = req.body;

  const isUserEmailAvai = await userModel.find({ email });
  const isUsernameAvai = await userModel.find({ username });
  const isPhonenoAvai = await userModel.find({ phoneno: +phoneno });

  if (isUserEmailAvai.length != 0) {
    res.status(400).json({ error: true, data: { message: [`'${email}' email already exists`] } });
    return false;
  }
  if (isPhonenoAvai.length != 0) {
    res.status(400).json({ error: true, data: { message: [`'${phoneno}' phone number already exists`] } });
    return false;
  }
  if (isUsernameAvai.length != 0) {
    res.status(400).json({ error: true, data: { message: [`'${username}' username already exists`] } });
    return false;
  }

  bcrypt.hash(password, 11, async (err, hash) => {
    if (!err) {
      const user = new userModel({
        _id: new mongoose.Types.ObjectId(),
        username: username,
        email: email,
        password: hash,
        phoneno: +phoneno,
        bangToken: tokenValue.defaultTokenValue,
      });
      const createdUser = await user.save();
      const token: string = await jwt.sign({ userid: createdUser._id }, process.env.JWT_TOKEN!, {
        expiresIn: '24h',
      });
      res.status(201).json({
        error: false,
        data: {
          token,
        },
      });
    }
  });
  return true;
};

export default register;
