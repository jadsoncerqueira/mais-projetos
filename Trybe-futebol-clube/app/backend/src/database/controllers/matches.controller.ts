import { Request, Response } from 'express';
import { MatchesModel } from '../services';
import { paramsSaida } from '../services/matches.service';

const matchesService = new MatchesModel();

function reduced(item: paramsSaida[]) {
  const pontos = item.reduce((acc, it) => acc + it.totalPoints, 0);
  const games = item.reduce((acc, it) => acc + it.totalGames, 0);
  return {
    name: item[0].name,
    totalPoints: pontos,
    totalGames: games,
    totalVictories: item.reduce((acc, it) => acc + it.totalVictories, 0),
    totalDraws: item.reduce((acc, it) => acc + it.totalDraws, 0),
    totalLosses: item.reduce((acc, it) => acc + it.totalLosses, 0),
    goalsFavor: item.reduce((acc, it) => acc + it.goalsFavor, 0),
    goalsOwn: item.reduce((acc, it) => acc + it.goalsOwn, 0),
    goalsBalance: item.reduce((acc, it) => acc + it.goalsBalance, 0),
    efficiency: ((pontos / (games * 3)) * 100).toFixed(2),
  };
}

type Att = 'name'
| 'totalPoints'
| 'totalGames'
| 'totalVictories'
| 'totalDraws'
| 'totalLosses'
| 'goalsFavor'
| 'goalsOwn'
| 'goalsBalance'
| 'efficiency';

const removeDuplicate = (results: paramsSaida[], att: Att) => {
  const setPerson = new Set();
  return results.filter((per) => {
    const duplicatedPerson = setPerson.has(per[att]);
    setPerson.add(per[att]);
    return !duplicatedPerson;
  });
};

const conditionOrder1 = (a: paramsSaida, b: paramsSaida) => {
  if (a.goalsFavor === b.goalsFavor) {
    const other = a.goalsOwn > b.goalsOwn ? 1 : 0;
    return a.goalsOwn > b.goalsOwn ? -1 : other;
  }
  const other = a.goalsFavor > b.goalsFavor ? 1 : 0;
  return a.goalsFavor > b.goalsFavor ? -1 : other;
};

const conditionOrder2 = (a: paramsSaida, b: paramsSaida) => {
  if (a.goalsBalance === b.goalsBalance) {
    return conditionOrder1(a, b);
  }
  const other = a.goalsBalance > b.goalsBalance ? 1 : 0;
  return a.goalsBalance > b.goalsBalance ? -1 : other;
};

const order = (results: paramsSaida[]) => {
  results.sort((a, b) => {
    let other = a.totalPoints > b.totalPoints ? 1 : 0;
    if (a.totalPoints === b.totalPoints) {
      if (a.totalVictories === b.totalVictories) {
        return conditionOrder2(a, b);
      }
      other = a.totalVictories > b.totalVictories ? 1 : 0;
      return a.totalVictories > b.totalVictories ? -1 : other;
    }
    return a.totalPoints > b.totalPoints ? -1 : other;
  });
};

const MatchesController = {
  async findAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    const aux = inProgress === undefined ? null : String(inProgress);
    const matches = await matchesService.findAll(aux);
    return res.status(200).json(matches);
  },

  async insert(req: Request, res: Response) {
    const matche = await matchesService.insert(req.body);
    if (matche.type) return res.status(404).json({ message: matche.message });
    return res.status(201).json(matche.message);
  },

  async updateStatus(req: Request, res: Response) {
    await matchesService.insertStatus(Number(req.params.id));
    return res.status(200).json({ message: 'Finished' });
  },

  async updateResults(req: Request, res: Response) {
    await matchesService.insertMatchesResults(Number(req.params.id), req.body);
    return res.status(200).json({ message: 'ok' });
  },

  async findResults(req: Request, res: Response) {
    const results = await matchesService.findResults('home');

    order(results);

    const filterPerson = removeDuplicate(results, 'name');
    return res.status(200).json(filterPerson);
  },

  async findResultsAway(req: Request, res: Response) {
    const results = await matchesService.findResults(null);

    order(results);

    const filterPerson = removeDuplicate(results, 'name');
    return res.status(200).json(filterPerson);
  },

  async findAllResults(_req: Request, res: Response) {
    const home = await matchesService.findResults('home');
    const away = await matchesService.findResults(null);
    const allResults = [...home, ...away];

    const response = allResults.map((result) => {
      const auxName = result.name;
      const resultados = allResults.filter((el) => el.name === auxName);
      return resultados;
    });

    const final = response.map((el) => {
      const removed = removeDuplicate(el, 'efficiency');
      return reduced(removed);
    });

    const removed = removeDuplicate(final, 'name');
    order(removed);

    return res.status(200).json(removed);
  },
};

export default MatchesController;
