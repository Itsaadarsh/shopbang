import express from 'express';
import register from '../../utils/registerUserLogic';
import validationMiddleware from '../../middleware/validation/validationRegister';
import { validationResult } from 'express-validator';

const router = express.Router();

router.post('/register', validationMiddleware(), async (req: express.Request, res: express.Response) => {
  try {
    const valiErrors = validationResult(req);
    if (!valiErrors.isEmpty()) {
      res.status(400).json({ error: true, data: { message: valiErrors.array() } });
      return;
    }
    await register(req, res);
  } catch (err) {
    res.status(400).json({ error: true, data: { message: err.message } });
  }
});

export { router as register };
