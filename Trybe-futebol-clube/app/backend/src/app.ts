import * as express from 'express';
import routerUser, { routerTeam, routerMatches, routerLeaderboard } from './routers';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
    this.routers();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  private routers(): void {
    this.app.use('/login', routerUser);
    this.app.use('/teams', routerTeam);
    this.app.use('/matches', routerMatches);
    this.app.use('/leaderboard', routerLeaderboard);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export default App;
