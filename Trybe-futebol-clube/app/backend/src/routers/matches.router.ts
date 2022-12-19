import { Router } from 'express';
import teamsMatchesValidate from '../midd/TeamsMatches';
import { MatchesController } from '../database/controllers';
import Auth from '../midd/auth';

const routerMatches = Router();

routerMatches.get('/', MatchesController.findAll);
routerMatches.post('/', Auth, teamsMatchesValidate, MatchesController.insert);
routerMatches.patch('/:id/finish', Auth, MatchesController.updateStatus);
routerMatches.patch('/:id', MatchesController.updateResults);

export default routerMatches;
