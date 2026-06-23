import shortid from "shortid"
import URLModel from "../models/url.js";

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

export async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;

    if (!body?.url) {
        return res.status(400).json({ message: "url is required" });
    }

    if (!isValidUrl(body.url)) {
        return res.status(400).json({ message: "Invalid URL format" });
    }

    try {
        // Check if URL already exists
        const existingEntry = await URLModel.findOne({ redirectURL: body.url });
        
        if (existingEntry) {
            return res.json({ id: existingEntry.shortId, isNew: false });
        }

        // If not, create new short ID
        const shortID = shortid();
        await URLModel.create({
            shortId: shortID,
            redirectURL: body.url,
            visitHistory: [],
        });

        return res.json({ id: shortID, isNew: true });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: "Short ID already exists, please try again" });
        }
        console.error("Failed to create short URL:", error);
        return res.status(500).json({ message: "Failed to create short URL" });
    }
}