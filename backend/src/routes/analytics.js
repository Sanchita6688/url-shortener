import express from "express";
import { handleGetAnalytics } from "../controllers/analytics.js";

const router = express.Router();

router.get("/:shortId", handleGetAnalytics);

export default router;
