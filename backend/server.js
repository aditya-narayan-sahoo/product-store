import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";

import { aj } from "./lib/arcjet.js";
import { initDB } from "./config/db.js";
import productRoutes from "./routes/product.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5432;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet()); // helmet is used to set security headers
app.use(morgan("dev")); // morgan is used to log requests

// arcjet rate limiting
app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1, // specify that each request consumes 1 token
    });
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.status(429).json({ error: "Too many requests" });
      } else if (decision.reason.isBot()) {
        res.status(403).json({ error: "Bot detected, access denied" });
      } else {
        res.status(403).json({ error: "Forbidden, access denied" });
      }
      return;
    }

    if (
      decision.results.some(
        (result) => result.reason.isBot() && result.reason.isSpoofed()
      )
    ) {
      res.status(403).json({ error: "Spoofed bot detected" });
      return;
    }
    next();
  } catch (error) {
    console.log(`Arcjet error: ${error}`);
    next(error);
  }
});

// routes
app.use("/api/products", productRoutes);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
