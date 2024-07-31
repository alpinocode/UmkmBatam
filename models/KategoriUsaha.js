import { Sequelize } from "sequelize";
import db from "../config/server.js";
import Usaha from "./UsahaModels.js";

const { DataTypes } = Sequelize;

const KategoriUsaha = db.define(
  "kategori_usaha",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    nama: {
      type: DataTypes.STRING,
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

Usaha.belongsTo(KategoriUsaha);

export default KategoriUsaha;
