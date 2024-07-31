import Produk from "../models/produkModel.js";
import Usaha from "../models/UsahaModels.js";

export const getProduk = async (req, res) => {
  try {
    const produk = await Produk.findAll({
      attributes: [
        "uuid",
        "suka",
        "nama_produk",
        "img_produk",
        "link_mshoope",
        "link_mtokopedia",
      ],
      order: [
        "nama_produk",
        "img_produk",
        "link_mshoope",
        "link_mtokopedia",
        "suka",
      ],
      include: {
        model: Usaha,
        attributes: [
          "nama_usaha",
          "deskripsi_usaha",
          "alamat_usaha",
          "kecamatan",
          "link_wa",
          "link_ig",
          "link_fb",
          "status",
        ],
      },
    });
    return res.status(200).json({ produk });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getProdukById = async (req, res) => {
  try {
    const produk = await Produk.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!produk)
      return res
        .status(403)
        .json({ message: "ID Produk tidak dapat ditemukan" });

    return res.status(200).json({ produk });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const createProduk = async (req, res) => {
  const {
    suka,
    nama_produk,
    img_produk,
    link_mshoope,
    link_mtokopedia,
    usaha_id,
  } = req.body;

  // const produkByPk = await Produk.findByPk(usaha_id);
  // if (!produkByPk)
  //   return res.status(403).json({
  //     message: "usaha_id tidak ada",
  //   });

  try {
    const produk = await Produk.create({
      suka: suka,
      nama_produk: nama_produk,
      img_produk: img_produk,
      link_mshoope: link_mshoope,
      link_mtokopedia: link_mtokopedia,
      usaha_id: usaha_id,
    });

    return res.status(201).json({
      message: "Data Produk berhasil ditambahkan",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateProduk = async (req, res) => {
  const {
    suka,
    nama_produk,
    img_produk,
    link_mshoope,
    link_mtokopedia,
    usaha_id,
  } = req.body;
  const produkId = await Produk.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  //   if (req.uuid || req.id === produkId)
  //     return res
  //       .status(403)
  //       .json({ message: "Mohon tolong di isikan datanya dulu" });
  if (!produkId)
    return res.status(403).json({ message: "Produk id tidak dapat ditemukan" });

  try {
    await Produk.update(
      {
        suka: suka,
        nama_produk: nama_produk,
        img_produk: img_produk,
        link_mshoope: link_mshoope,
        link_mtokopedia: link_mtokopedia,
        usaha_id: usaha_id,
      },
      {
        where: {
          uuid: req.params.id,
        },
      }
    );

    return res.status(200).json({
      message: "update data berhasil di tambahkan",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteProduk = async (req, res) => {
  const produkId = await Produk.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!produkId)
    return res.status(403).json({
      message: "id tidak dapat ditemukan",
    });

  try {
    await Produk.destroy({
      where: {
        uuid: produkId.id,
      },
      force: true,
    });

    return res.status(200).json({
      message: "Berhasil menghapus data",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
