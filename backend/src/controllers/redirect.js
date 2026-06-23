import URL from "../models/url.js";

export async function handleRedirectNewShortUrl(req, res) {
    const shortId = req.params.shortId;

    try {
        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: { timestamp: Date.now() },
                },
            },
            { returnDocument: "after" }
        );

        if (!entry) {
            return res.status(404).json({ message: "Short URL not found" });
        }

        return res.redirect(entry.redirectURL);
    } catch (error) {
        console.error("Redirect failed:", error);
        return res.status(500).json({ message: "Unable to redirect to target URL" });
    }
}
