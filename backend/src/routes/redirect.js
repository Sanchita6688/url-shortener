import express from "express";
import { handleRedirectNewShortUrl } from "../controllers/redirect.js";

const router = express.Router();

router.get("/:shortId", handleRedirectNewShortUrl);

export default router;
