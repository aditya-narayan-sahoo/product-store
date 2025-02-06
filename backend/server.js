import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";

import { initDB } from "./config/db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5432;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet()); // helmet is used to set security headers
app.use(morgan("dev")); // morgan is used to log requests

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
