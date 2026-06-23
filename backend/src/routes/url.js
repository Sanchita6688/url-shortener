import express from "express"
import {handleGenerateNewShortUrl} from "../controllers/url.js"

const router = express.Router();

router.post("/",handleGenerateNewShortUrl);

export default router;