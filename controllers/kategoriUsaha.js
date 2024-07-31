import KategoriUsaha from "../models/KategoriUsaha.js";
import Usaha from "../models/UsahaModels.js";

export const getKategori = async (req, res) => {
  try {
    const kategoriUsaha = await KategoriUsaha.findAll({
      attributes: ["uuid", "nama"],
    });
    return res.status(200).json({ kategoriUsaha });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getKategoriById = async (req, res) => {
  try {
    const kategoriUsaha = await KategoriUsaha.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!kategoriUsaha)
      return res
        .status(403)
        .json({ message: "Id Kategori Usaha tidak dapat ditemukan" });

    return res.status(200).json({ kategoriUsaha });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const createKategory = async (req, res) => {
  const { nama } = req.body;

  try {
    await KategoriUsaha.create({
      nama: nama,
    });
    return res.status(201).json({
      message: "Create data kategory success",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateKategory = async (req, res) => {
  const kategoryId = await KategoriUsaha.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!kategoryId)
    return res
      .status(403)
      .json({ message: "Kategory id tidak dapat ditemukan" });

  const { nama, kategoriUsahaId } = req.body;

  try {
    await KategoriUsaha.update(
      {
        nama: nama,
        kategoriUsahaId: kategoriUsahaId,
      },
      {
        where: {
          uuid: req.params.id,
        },
      }
    );
    return res.status(200).json({
      message: "Data Berhasil di update",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteKategori = async (req, res) => {
  const kategoryId = await KategoriUsaha.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!kategoryId)
    return res
      .status(403)
      .json({ message: "Kategory id tidak dapat ditemukan" });

  try {
    await KategoriUsaha.destroy({
      where: {
        uuid: req.params.id,
      },
      force: true,
    });
    return res.status(200).json({
      message: "data berhasil di hapus",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
