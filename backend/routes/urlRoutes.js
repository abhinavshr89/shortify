import express from "express";
import Url from "../models/Url";

const router = express.Router();

router.post("/shorten-url", async (req, res) => {
    try {
        const { longUrl } = req.body;
        if (!longUrl) {
            return res.status(400).json({ error: "URL is required" });
        }

        // Generate a random key for the shortened URL
        const randomKey = Math.random().toString(36).substring(2, 8);

        // Save the URL mapping in the database
        const url = new Url({ randomKey, originalUrl: longUrl });
        await url.save();

        const shortUrl = `http:localhost:3000/${randomKey}`;
        return res.status(200).json({ shortUrl });
    } catch (error) {
        console.error("Error shortening URL:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/:key", async (req, res) => {
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
}
);
export default router;