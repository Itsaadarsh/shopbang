import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: mongoose.Schema.Types.String, required: true },
    tags: { type: mongoose.Schema.Types.Array, required: true },
    price: { type: mongoose.Schema.Types.Number, required: true },
    image: { type: mongoose.Schema.Types.String, required: true },
  },
  { timestamps: true }
);

export interface PRODUCT extends mongoose.Document {
  _id?: string;
  name: string;
  tags: Array<string>;
  price: number;
  image: string;
}

const productModel = mongoose.model<PRODUCT>('products', productSchema);

export default module.exports = productModel;
