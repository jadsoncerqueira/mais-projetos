import { Model, DataTypes } from 'sequelize';
import db from '.';
import TeamModel from './team.model';

class MatchesModel extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;
}

MatchesModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

MatchesModel.belongsTo(TeamModel, {
  foreignKey: 'homeTeam', as: 'teamHome',
});

MatchesModel.belongsTo(TeamModel, {
  foreignKey: 'awayTeam', as: 'teamAway',
});

TeamModel.hasMany(MatchesModel, {
  foreignKey: 'homeTeam', as: 'timeDeCasaHas',
});

TeamModel.hasMany(MatchesModel, {
  foreignKey: 'awayTeam', as: 'timeDeForaHas',
});

export default MatchesModel;
