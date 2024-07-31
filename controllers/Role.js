import Role from "../models/roleModels.js";

export const getRole = async (req, res) => {
  try {
    const role = await Role.findAll({
      attributes: ["uuid", "role"],
    });

    return res.status(200).json({ role });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getRoleId = async (req, res) => {
  try {
    const roleid = await Role.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!roleid)
      return res.status(403).json({
        message: "Data id yang anda berikan tidak ada",
      });
    return res.status(200).json({ roleid });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const createRole = async (req, res) => {
  const { role, roleId } = req.body;

  const validRole = ["ADMIN", "PENJUAL", "USER"];

  if (!validRole.includes(role))
    return res.status(403).json({
      message:
        "Data yang harus dimasukan hanya ADMIN,PENJUAL, USER. MENGGUNAKAN HURUF KAPITAL",
    });
  try {
    await Role.create({
      role: role,
      roleId: roleId,
    });
    return res.status(201).json({
      message: "Berhasil menambahkan data role",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateRole = async (req, res) => {
  const { role, roleId } = req.body;

  const validRole = ["ADMIN", "PENJUAL", "USER"];

  if (!validRole.includes(role))
    return res.status(403).json({
      message:
        "Data yang harus dimasukan hanya ADMIN,PENJUAL, USER. MENGGUNAKAN HURUF KAPITAL",
    });

  try {
    const roleid = await Role.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!roleid)
      return res.status(403).json({
        message: "Data yang anda berikan tidak ada",
      });

    await Role.update(
      {
        role: role,
        roleId: roleId,
      },
      {
        where: {
          uuid: roleid.uuid,
        },
      }
    );

    return res.status(200).json({
      message: "Update Data Berhasil",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteRole = async (req, res) => {
  const roleid = await Role.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!roleid)
    return res.status(403).json({
      message: "Data yang anda berikan tidak ada",
    });

  try {
    await Role.destroy({
      where: {
        uuid: roleid.uuid,
      },
      force: true,
    });
    return res.status(200).json({
      message: "Data role berhasil dihapus",
    });
  } catch (error) {
    returnres.status(500).json({
      message: error.message,
    });
  }
};
