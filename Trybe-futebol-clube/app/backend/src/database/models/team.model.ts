import { Model, DataTypes } from 'sequelize';
import db from '.';

class TeamModel extends Model {
  id!: number;
  teamName!: string;
}

TeamModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default TeamModel;
