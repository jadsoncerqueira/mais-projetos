import { Router } from 'express';
import { MatchesController } from '../database/controllers';

const routerLeaderboard = Router();

routerLeaderboard.get('/', MatchesController.findAllResults);
routerLeaderboard.get('/home', MatchesController.findResults);
routerLeaderboard.get('/away', MatchesController.findResultsAway);

export default routerLeaderboard;
