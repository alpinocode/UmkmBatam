import Komentar from "../models/KomentarModel.js";
import Produk from "../models/produkModel.js";

export const getKomentar = async (req, res) => {
  try {
    const komentar = await Komentar.findAll({
      attributes: ["uuid", "deksripsi_comment", "user_id"],
    });

    return res.status(200).json({ komentar });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getKomentarById = async (req, res) => {
  try {
    const komentar = await Komentar.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!komentar)
      return res.status(403).json({
        message: "Data yang anda berikan tidak ada",
      });

    return res.status(200).json({ komentar });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const createKomentar = async (req, res) => {
  const { deksripsi_comment, user_id, produk_id } = req.body;

  try {
    await Komentar.create({
      deksripsi_comment: deksripsi_comment,
      user_id: user_id,
      produk_id: produk_id,
    });

    return res.status(201).json({
      message: "komentar berhasil di tambahkan",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateKomentar = async (req, res) => {
  const { deksripsi_comment, user_id, produk_id } = req.body;
  const komentarId = await Komentar.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!komentarId)
    return res.status(403).json({
      message: "Komentar Id tidak dapat ditemukan",
    });

  try {
    await Komentar.update(
      {
        deksripsi_comment: deksripsi_comment,
        user_id: user_id,
        produk_id: produk_id,
      },
      {
        where: {
          uuid: komentarId.uuid,
        },
      }
    );
    return res.status(200).json({
      message: "Update berhasil",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteKomentar = async (req, res) => {
  const komentarId = await Komentar.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!komentarId)
    return res.status(403).json({
      message: "id tidak dapat ditemukan",
    });
  try {
    await Komentar.destroy({
      where: {
        uuid: komentarId.uuid,
      },
    });
    return res.status(200).json({
      message: "Komentar berhasil di hapus",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
