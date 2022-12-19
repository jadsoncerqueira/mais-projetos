import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { ValidatePropsUsers } from '../middlewares/propsValidate';

const router = Router();

const userControler = new UserController();

router.post('/users', ValidatePropsUsers, userControler.create);
router.post('/login', userControler.login);

export default router;