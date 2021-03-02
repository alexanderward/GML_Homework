import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/database";

export class User extends Model{
    public id: number;
    public personaID: string;
    public firstName: string;
    public lastName: string;
    public interets: string[];
    public point: any;
    public city: string;
    public state: string;
    public temperature: string;
}

export interface Point {
    type: string;
    coordinates: number[];
}

export interface UserInterface {
    id: number;
    personaID: string;
    firstName: string;
    lastName: string;
    interests: string[];
    point : Point;
}

User.init(
  {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    personaID: {
        type: new DataTypes.STRING(128),
        allowNull: false,
        unique: true
    },
    firstName: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    lastName: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    interests: {
        type: new DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
    point: {
        type: DataTypes.GEOMETRY('POINT', 4326),
        allowNull: false
    },
  },
  {
    tableName: "users",
    sequelize: database, // this bit is important
  }
);

User.sync({ force: false }).then((resp) => console.log(resp), (err)=>console.log(err));