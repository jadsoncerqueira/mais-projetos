import { Router } from 'express';
import { TeamController } from '../database/controllers';

const routerTeam = Router();

routerTeam.get('/', TeamController.findAll);
routerTeam.get('/:id', TeamController.findOne);

export default routerTeam;
