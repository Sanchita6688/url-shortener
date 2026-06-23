import shortid from "shortid"
import URL from "../models/url.js";

export async function handleGenerateNewShortUrl(req,res) {
    const body = req.body;

    if(!body?.url) return res.status(400).json({message: "url is required"});

    const shortID = shortid();
    await URL.create({
        shortId : shortID,
        redirectURL: req.url,
        visitHistory: [],
    })

    return res.json({id : shortID});
}