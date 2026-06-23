import shortid from "shortid"
import URL from "../models/url.js";

export async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;

    if (!body?.url) {
        return res.status(400).json({ message: "url is required" });
    }

    try {
        const shortID = shortid();
        await URL.create({
            shortId: shortID,
            redirectURL: body.url,
            visitHistory: [],
        });

        return res.json({ id: shortID });
    } catch (error) {
        console.error("Failed to create short URL:", error);
        return res.status(500).json({ message: "Failed to create short URL" });
    }
}