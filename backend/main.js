import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import urlRoutes from "./routes/urlRoutes.js";
import connectDB from "./db/connectDb.js";
import Url from "./models/Url.js";
import job from "./lib/cron.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
job.start();

connectDB();

app.use("/api/shortify", urlRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to Shortify API");
}
);
app.get("/:key", async (req, res) => {
  try {
    const { key } = req.params;
    const url = await Url.findOne({ randomKey: key });
    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }
    return res.redirect(url.originalUrl);
  } catch (error) {
    console.error("Error redirecting URL:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
