import { Sequelize } from "sequelize";
import db from "../config/server.js";
import User from "./usersModels.js";

const { DataTypes } = Sequelize;

const Role = db.define(
  "user_role",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    role: {
      type: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM("PENJUAL", "ADMIN", "USER"),
      },
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

User.belongsTo(Role);

export default Role;
