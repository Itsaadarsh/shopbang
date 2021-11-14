import express from 'express';
import register from '../../utils/registerUserLogic';
import validationMiddleware from '../../middleware/validation/register';
import validate from '../../utils/validationError';

const router = express.Router();

router.post('/register', validationMiddleware(), async (req: express.Request, res: express.Response) => {
  try {
    if (validate(req, res)) {
      return;
    }
    await register(req, res);
  } catch (err) {
    res.status(400).json({ error: true, data: { message: [err.message] } });
  }
});

export { router as register };
