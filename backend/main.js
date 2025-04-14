import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import urlRoutes from "./routes/urlRoutes.js";
import connectDB from "./db/connectDb.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

connectDB();


app.use("/api/shortify", urlRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
