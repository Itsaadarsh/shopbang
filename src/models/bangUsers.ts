import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: mongoose.Schema.Types.String, required: true, unique: true },
    phoneno: { type: mongoose.Schema.Types.Number, required: false, unique: true },
    email: { type: mongoose.Schema.Types.String, required: true, unique: true },
    password: { type: mongoose.Schema.Types.String, required: true },
    twitterId: { type: mongoose.Schema.Types.String, required: false },
    instagramId: { type: mongoose.Schema.Types.String, required: false },
    nationality: { type: mongoose.Schema.Types.String, required: false },
    bangToken: { type: mongoose.Schema.Types.Number, required: false },
    referralCount: { type: mongoose.Schema.Types.Number, default: 0 },
  },
  { timestamps: true }
);

export interface USER extends mongoose.Document {
  _id: string;
  username: string;
  phoneno: number;
  email: string;
  password: string;
  twitterId: string;
  instagramId: string;
  nationality: string;
  bangToken: number;
  referralCount: number;
  createdAt: Date;
  updateAt: Date;
}

const userModel = mongoose.model<USER>('bang_users', userSchema);

export default module.exports = userModel;
