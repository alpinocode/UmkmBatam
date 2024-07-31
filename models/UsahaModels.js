import { Sequelize } from "sequelize";
import db from "../config/server.js";

const { DataTypes } = Sequelize;

const Usaha = db.define(
  "usahamodel",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    nama_usaha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deskripsi_usaha: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    alamat_usaha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kecamatan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    link_wa: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    link_ig: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    link_fb: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Usaha;
