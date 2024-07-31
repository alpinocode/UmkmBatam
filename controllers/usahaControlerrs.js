import Usaha from "../models/UsahaModels.js";

export const getUsaha = async (req, res) => {
  try {
    const usaha = await Usaha.findAll({
      attributes: [
        "uuid",
        "nama_usaha",
        "deskripsi_usaha",
        "alamat_usaha",
        "kecamatan",
        "link_wa",
        "link_ig",
        "link_fb",
        "status",
      ],
    });
    res.status(200).json({ usaha });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUsahaId = async (req, res) => {
  try {
    const usahaById = await Usaha.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!usahaById)
      return res.status(403).json({
        message: "Data Usaha tidak dapat di temukan",
      });

    return res.status(200).json({ usahaById });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const createUsaha = async (req, res) => {
  const {
    nama_usaha,
    deskripsi_usaha,
    alamat_usaha,
    kecamatan,
    link_wa,
    link_ig,
    link_fb,
    status,
    kategoriUsahaId,
    userId,
  } = req.body;
  try {
    await Usaha.create({
      nama_usaha: nama_usaha,
      deskripsi_usaha: deskripsi_usaha,
      alamat_usaha: alamat_usaha,
      kecamatan: kecamatan,
      link_wa: link_wa,
      link_ig: link_ig,
      link_fb: link_fb,
      status: status,
      kategoriUsahaId: kategoriUsahaId,
      userId: userId,
    });
    return res.status(201).json({
      message: "Data usaha success tersimpan",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateUsaha = async (req, res) => {
  const {
    nama_usaha,
    deskripsi_usaha,
    alamat_usaha,
    kecamatan,
    link_wa,
    link_ig,
    link_fb,
    status,
  } = req.body;

  try {
    const usaha = await Usaha.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!usaha) {
      return res.status(404).json({ message: "Id tidak dapat ditemukan" });
    }

    // if (req.uuid || req.id === usaha)
    //   return res
    //     .status(403)
    //     .json({ message: "Mohon tolong di isikan datanya dulu" });

    await Usaha.update(
      {
        nama_usaha,
        deskripsi_usaha,
        alamat_usaha,
        kecamatan,
        link_wa,
        link_ig,
        link_fb,
        status,
      },
      {
        where: {
          uuid: req.params.id,
        },
      }
    );

    return res.status(200).json({ message: "Data berhasil diupdate" });
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUsaha = async (req, res) => {
  const usaha = await Usaha.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  console.log("Cek Usaha", usaha);

  if (!usaha)
    return res.status(403).json({
      message: "Data usaha tidak dapat ditemukan",
    });

  try {
    await Usaha.destroy({
      where: {
        id: usaha.id,
      },
      force: true, // menghapus secara permanen
    });
    return res.status(200).json({
      message: "Data usaha Berhasil di hapus",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
