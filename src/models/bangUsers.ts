import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: { type: mongoose.Schema.Types.String, required: true, unique: true },
  phoneno: { type: mongoose.Schema.Types.Number, required: false, unique: true },
  email: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
    match:
      /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
  },
  password: { type: mongoose.Schema.Types.String, required: true },
  twitterId: { type: mongoose.Schema.Types.String, required: false },
  instagramId: { type: mongoose.Schema.Types.String, required: false },
  nationality: { type: mongoose.Schema.Types.String, required: false },
  bangToken: { type: mongoose.Schema.Types.Number, required: false },
});

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
}

const userModel = mongoose.model<USER>('bang_users', userSchema);

export default module.exports = userModel;
