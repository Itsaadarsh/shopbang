import express from 'express';
import productModel from '../models/products';

const router = express.Router();

router.get('/products', async (_: express.Request, res: express.Response) => {
  try {
    const products = await productModel.find({});
    if (products.length == 0) {
      res.status(400).json({ error: true, data: { message: [`No products found`] } });
      return;
    }
    res.status(201).json({ error: false, data: products });
    return;
  } catch (err) {
    res.status(400).json({ error: true, data: { message: [err.message] } });
    return;
  }
});

export { router as getProducts };
