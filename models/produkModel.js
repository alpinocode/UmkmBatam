import { Sequelize } from "sequelize";
import db from "../config/server.js";
import Usaha from "./UsahaModels.js";

const { DataTypes } = Sequelize;

const Produk = db.define(
  "produk",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    suka: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    nama_produk: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    img_produk: {
      type: DataTypes.STRING,
    },
    link_mshoope: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    link_mtokopedia: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

Produk.belongsTo(Usaha, { foreignKey: "usaha_id" });
Usaha.hasMany(Produk);

export default Produk;
