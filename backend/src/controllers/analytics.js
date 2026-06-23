import URL from "../models/url.js";

export async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;

    try {
        const entry = await URL.findOne({ shortId });

        if (!entry) {
            return res.status(404).json({ message: "Short URL not found" });
        }

        return res.json({
            shortId: entry.shortId,
            redirectURL: entry.redirectURL,
            visitCount: entry.visitHistory.length,
            visitHistory: entry.visitHistory,
            createdAt: entry.createdAt,
            updatedAt: entry.updatedAt,
        });
    } catch (error) {
        console.error("Failed to fetch analytics:", error);
        return res.status(500).json({ message: "Unable to fetch analytics" });
    }
}
