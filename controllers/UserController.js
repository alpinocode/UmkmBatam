import User from "../models/usersModels.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const getUser = async (req, res) => {
  try {
    const user = await User.findAll({
      attributes: ["uuid", "username", "email", "imgprofile", "status"],
    });
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getUserByid = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    console.log("Cek Data Ini", user);
    if (!user)
      return res.status(403).json({
        message: "Id user tidak dapat ditemukan",
      });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const Register = async (req, res) => {
  const {
    username,
    email,
    password,
    confPassword,
    imgprofile,
    status,
    userId,
    userRoleId,
  } = req.body;

  try {
    if (userRoleId === null || userRoleId === undefined)
      return res.status(403).json({
        message: "Masukan data role anda dulu",
      });

    if (password !== confPassword)
      return res.status(403).json({ message: "Password tidak sama" });

    const salt = await bcrypt.genSalt();
    const hashingPassword = await bcrypt.hash(password, salt);

    const data = await User.create({
      username: username,
      email: email,
      password: hashingPassword,
      imgprofile: imgprofile,
      status: status,
      userId: userId,
      userRoleId: userRoleId,
    });

    return res.status(201).json({
      message: "Register berhasil",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Email sebelumnya sudah digunakan",
    });
  }
};

export const Login = async (req, res) => {
  try {
    const user = await User.findAll({
      where: {
        email: req.body.email,
      },
    });

    const macth = await bcrypt.compare(req.body.password, user[0].password);
    if (!macth) return res.status(403).json({ message: "Password salah" });

    const userId = user[0].id;
    const username = user[0].username;
    const email = user[0].email;

    const accessToken = jwt.sign(
      { userId, username, email },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "1h",
      }
    );

    const refreshToken = jwt.sign(
      { userId, username, email },
      process.env.REFRESH_TOKEN,
      {
        expiresIn: "1d",
      }
    );

    await User.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ accessToken });
  } catch (error) {
    return res.status(403).json({
      message: "email tidak ada",
    });
  }
};

export const LogOut = async (req, res) => {
  try {
    const refreshtoken = await req.cookies.refreshToken;
    if (!refreshtoken)
      return res
        .status(403)
        .json({ message: "Kesalahan pada di access token" });
    const user = await User.findAll({
      where: {
        refresh_token: refreshtoken,
      },
    });
    const userId = user[0].id;

    await User.update(
      { refreshtoken: null },
      {
        where: {
          id: userId,
        },
      }
    );
    res.clearCookie("refreshToken");
    return res.status(200).json({
      message: "anda berhasil Logout",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
