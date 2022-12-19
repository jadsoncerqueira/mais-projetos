import { Router } from 'express';
import UserController from '../database/controllers';

const routerUser = Router();
const userController = UserController;

routerUser.post('/', userController.login);
routerUser.get('/validate', userController.validate);

export default routerUser;
