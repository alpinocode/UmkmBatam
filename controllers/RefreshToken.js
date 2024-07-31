import User from "../models/usersModels.js";
import jwt from "jsonwebtoken";

export const RefreshToken = async (req, res) => {
  try {
    const refreshToken = await req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(403);
    const user = await User.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });

    if (!user[0]) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, result) => {
      if (err) return res.sendStatus(403);
      const userId = user[0].id;
      const username = user[0].username;
      const email = user[0].email;
      const accessToken = jwt.sign(
        { userId, username, email },
        process.env.ACCESS_TOKEN,
        {
          expiresIn: "30s",
        }
      );
      res.json({ accessToken });
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
