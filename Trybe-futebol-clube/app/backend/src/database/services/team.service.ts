import TeamModel from '../models/team.model';

export interface ITeam {
  id: number;
  teamName: string;
}

export default class TeamService {
  teamModel = TeamModel;
  async findAll() {
    const contas = await this.teamModel.findAll();
    return contas;
  }

  async findOne(id: number) {
    const conta = await this.teamModel.findOne({ where: { id } });
    return conta;
  }
}
