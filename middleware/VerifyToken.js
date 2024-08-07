import jwt from "jsonwebtoken";
import Role from "../models/roleModels.js";
import User from "../models/usersModels.js";

export const VerifyToken = async (req, res, next) => {
  const auhtHeader = req.headers["authorization"];
  const token = auhtHeader && auhtHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.sendStatus(401);
    req.user = user;
    next();
  });
};

export const adminAndPenjualVerify = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const user = await User.findOne({
      where: {
        id: userId,
      },
      include: {
        model: Role,
        as: "user_role",
      },
    });

    console.log("Cek datanya", user);

    if (!user) {
      return res.status(403).json({ message: "User tidak ditemukan" });
    }

    // Assuming user.role is an object or an array of objects

    if (user.user_role.role !== "ADMIN" && user.user_role.role !== "PENJUAL") {
      return res.status(401).json({
        message: "Akses ini hanya di berikan oleh Admin dan Penjual",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const adminOnly = async (req, res) => {
  const userId = req.user.userId;
  try {
    const user = await User.findOne({
      where: {
        id: userId,
      },
      include: { model: Role, as: "user_role" },
    });

    if (!user)
      return res.status(403).json({ message: "Id tidak dapat di temukan" });

    if (user.user_role.role !== "ADMIN") {
      return res
        .status(401)
        .json({ message: "Anda tidak Berhak memasuiki path ini" });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const PenjualVerify = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const user = await User.findOne({
      where: {
        id: userId,
      },
      include: { model: Role, as: "user_role" },
    });

    if (!user)
      return res.status(401).json({
        message: "Id tidak dapat ditemukan",
      });

    if (user.user_role.role !== "PENJUAL") {
      return res.status(401).json({
        message: "Akses ini hanya bisa di Akses oleh Penjual",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const UserVerify = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findOne({
      where: {
        id: userId,
      },
      include: { model: Role, as: "user_role" },
    });

    if (!user)
      return res.status(403).json({ message: "Id tidak dapat ditemukan" });

    if (user.user_role.role !== "USER") {
      return res.status(401).json({
        message: "Akses ini hanya bisa di akses oleh user",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const PenjualAndUserVerify = async (req, res) => {
  const userId = req.user.userId;
  try {
    const user = await User.findOne({
      where: {
        id: userId,
      },
      include: { model: Role, as: "user_role" },
    });

    if (!user)
      return res.status(403).json({
        message: "Id anda tidak dapat ditemukan",
      });

    if (user.user_role.role !== "USER" && user.user_role.role !== "PENJUAL") {
      return res.status(401).json({
        message: "Akses ini hanya bisa di lakukan oleh Penjual and User",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
