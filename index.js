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
import { errorHandler, notFound } from "./middleware/errorHandler.js";

// env
const port = process.env.PORT;

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
app.use(usaha);
app.use(kategoriUsaha);
app.use(produkUsaha);
app.use(userRoute);
app.use(roleRoute);
app.use(komentarRoute);
app.use(errorHandler);
app.use(notFound);

app.listen(port, () => {
  console.log(`Server Berjalan pada ${port}`);
});
