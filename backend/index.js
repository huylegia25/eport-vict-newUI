import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./db.js";
import searchRoutes from "./routes/search.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/search", searchRoutes);
app.use("/api/auth", authRoutes);


app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`🚀 Backend running on port ${process.env.PORT}`);
});

