import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import TokenValidate from '../middlewares/auth';

const router = Router();

const orderControler = new OrderController();

router.get('/orders', orderControler.getAll);
router.post('/orders', TokenValidate, orderControler.create);

export default router;