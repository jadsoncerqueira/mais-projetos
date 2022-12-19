import MatchesModel from '../models/matches.model';
import TeamModel from '../models/team.model';

export interface ITeam {
  id: number;
  teamName: string;
}

export interface IMatches {
  id?:number;
  homeTeam: number;
  homeTeamGoals:number;
  awayTeam:number;
  awayTeamGoals:number;
  inProgress?: boolean;
}

export interface IModel {
  type: null | string;
  message: string | IMatches;
}

interface IResults {
  homeTeamGoals: 3;
  awayTeamGoals: 1;
}

interface resul {
  'id': number;
  'homeTeam': number;
  'homeTeamGoals': number;
  'awayTeam': number;
  'awayTeamGoals': number;
  'inProgress': boolean;
  'teamHome': {
    'teamName': string
  },
  'teamAway': {
    'teamName': string
  }
}

export interface params {
  n: string,
  p: number,
  j: number,
  v: number,
  e: number,
  d: number,
  gp: number,
  gc: number,
  sg: number,
  por: string,
}

export interface paramsSaida {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string,
}

export const returnedClasifi = (dt: params) => {
  const retu = {
    name: dt.n,
    totalPoints: dt.p,
    totalGames: dt.j,
    totalVictories: dt.v,
    totalDraws: dt.e,
    totalLosses: dt.d,
    goalsFavor: dt.gp,
    goalsOwn: dt.gc,
    goalsBalance: dt.sg,
    efficiency: dt.por,
  };
  return retu;
};
type Option = 'homeTeamGoals' | 'awayTeamGoals';

function auxiliar(tea: resul[], option: Option, option2: Option) {
  let v = 0; let e = 0; let d = 0; let gp = 0; let gc = 0;

  const pontos = tea.reduce((acc, item) => {
    let pon = item[option] > item[option2] ? 3 : false;
    pon = item[option] === item[option2] && pon === false ? 1 : pon;
    gp += item[option];
    gc += item[option2];
    if (pon === 3) v += 1;
    if (pon === 1) e += 1;
    if (pon === false) d += 1;

    if (pon) return acc + pon;
    return acc + 0;
  }, 0);
  return { pontos, v, e, d, gp, gc, sg: gp - gc };
}

export default class MatchesService {
  matchesModel = MatchesModel;
  teamModel = TeamModel;
  async findAll(inProgress: string | null): Promise<(resul | MatchesModel)[]> {
    if (inProgress !== null) {
      const matches = await this.matchesModel.findAll({
        include: [
          { model: TeamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: TeamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
        ],
        where: { inProgress: inProgress === 'true' },
      });
      return matches;
    }
    const matches = await this.matchesModel.findAll({
      include: [
        { model: TeamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  async insert(data: IMatches, status = true): Promise<IModel> {
    const {
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
    } = data;

    const time1 = await this.teamModel.findOne({ where: { id: homeTeam } });
    const time2 = await this.teamModel.findOne({ where: { id: awayTeam } });

    if (!(time1 && time2)) return { type: 'error', message: 'There is no team with such id!' };

    const conta = await this.matchesModel
      .create({ homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress: status });

    return { type: null, message: conta };
  }

  async insertStatus(id: number): Promise<void> {
    await this.matchesModel.update(
      { inProgress: false },
      { where: { id } },
    );
  }

  async insertMatchesResults(id: number, data: IResults): Promise<void> {
    await this.matchesModel.update(
      { homeTeamGoals: data.homeTeamGoals, awayTeamGoals: data.awayTeamGoals },
      { where: { id } },
    );
  }

  async findResults(option: string | null) {
    const select = option ? 'teamHome' : 'teamAway';
    const jogos = await this.findAll('false') as resul[];
    const result: string[] = [];
    jogos.forEach((jogo) => {
      if (!(jogo[select].teamName in result)) result.push(jogo[select].teamName);
    });

    const op = select === 'teamHome' ? 'homeTeamGoals' : 'awayTeamGoals';
    const op2 = op === 'homeTeamGoals' ? 'awayTeamGoals' : 'homeTeamGoals';

    const result2 = result.map((name) => {
      const tea = jogos.filter((element) => element[select].teamName === name);
      const { pontos, v, e, d, gp, gc, sg } = auxiliar(tea, op, op2);

      const por = ((pontos / (tea.length * 3)) * 100).toFixed(2);

      return returnedClasifi(
        { n: name, p: pontos, j: tea.length, v, e, d, gp, gc, sg, por },
      );
    });
    // order(result2);
    return result2;
  }
}
