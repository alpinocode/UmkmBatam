import { Sequelize } from "sequelize";
import db from "../config/server.js";
import Produk from "./produkModel.js";

const { DataTypes } = Sequelize;

const Komentar = db.define(
  "komentar",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    deksripsi_comment: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);

Komentar.belongsTo(Produk, { foreignKey: "produk_id" });
Produk.hasMany(Komentar);

export default Komentar;
