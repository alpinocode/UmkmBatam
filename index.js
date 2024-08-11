import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import expresSesion from "express-session";
// env setup
dotenv.config();

// global
import db from "./config/server.js";

try {
  await db.authenticate();
  console.log("Database Running");
  await db.sync();
} catch (error) {
  console.log(error);
}

// route
import usaha from "./routes/UsahaRoute.js";
import kategoriUsaha from "./routes/kategoryUsaha.js";
import produkUsaha from "./routes/ProdukRoute.js";
import userRoute from "./routes/UserRoute.js";
import roleRoute from "./routes/RoleRoute.js";
import komentarRoute from "./routes/KomentarRoute.js";
import { notFound } from "./middleware/errorHandler.js";
import multer from "multer";

// env
const port = process.env.PORT;

// multer
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "_" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// express implemation
const app = express();

app.use(
  cors({
    credentials: true,
    origin: "https://localhost:3000",
  })
);

app.use(
  expresSesion({
    secret: "s3Cur3",
    name: "project-umkm-batam",
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use(usaha);
app.use(kategoriUsaha);
app.use(produkUsaha);
app.use(userRoute);
app.use(roleRoute);
app.use(komentarRoute);
app.use(notFound);

app.listen(port, () => {
  console.log(`Server Berjalan pada ${port}`);
});
