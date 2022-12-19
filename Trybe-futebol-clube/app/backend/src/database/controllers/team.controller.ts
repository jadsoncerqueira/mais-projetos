import { Request, Response } from 'express';
import { TeamService } from '../services';

const teamService = new TeamService();

const TeamController = {
  async findAll(_req: Request, res: Response) {
    const conta = await teamService.findAll();
    return res.status(200).json(conta);
  },

  async findOne(req: Request, res: Response) {
    const { id } = req.params;
    const conta = await teamService.findOne(Number(id));
    return res.status(200).json(conta);
  },
};

export default TeamController;
