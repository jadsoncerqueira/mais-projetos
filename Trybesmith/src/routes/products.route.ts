import { Router } from 'express';
import ProductsController from '../controllers/product.controller';
import { ValidatePropsPro } from '../middlewares/propsValidate';

const router = Router();

const productControler = new ProductsController();

router.post('/products', ValidatePropsPro, productControler.create);
router.get('/products', productControler.getAll);

export default router;