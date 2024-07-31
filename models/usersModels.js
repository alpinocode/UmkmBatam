import { Sequelize } from "sequelize";
import db from "../config/server.js";
import Usaha from "./UsahaModels.js";

const { DataTypes } = Sequelize;

const User = db.define(
  "users",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,

      validate: {
        isEmail: {
          msg: "data yang dimasukkan harus berformat email",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    imgprofile: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.BOOLEAN,
    },
    refresh_token: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

Usaha.belongsTo(User);

export default User;
