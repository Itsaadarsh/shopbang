import mongoose from 'mongoose';

const reviewProductSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    productId: { type: mongoose.Schema.Types.ObjectId, required: true },
    username: { type: mongoose.Schema.Types.String, required: true },
    review: { type: mongoose.Schema.Types.String, required: true },
  },
  { timestamps: true }
);

export interface REVIEW extends mongoose.Document {
  _id: string;
  productId: string;
  username: string;
  review: string;
}

const reviewModel = mongoose.model<REVIEW>('product_reviews', reviewProductSchema);

export default module.exports = reviewModel;
