import mongoose from 'mongoose';

const dailyLoginSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    userId: { type: mongoose.Schema.Types.String, required: true, unique: true },
  },
  { timestamps: true }
);

export interface DailyLogin extends mongoose.Document {
  _id: string;
  userId: string;
  createdAt: Date;
  updateAt: Date;
}

const dailyLoginModel = mongoose.model<DailyLogin>('daily_login', dailyLoginSchema);

export default module.exports = dailyLoginModel;
