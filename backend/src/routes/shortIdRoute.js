import express from "express"
import {handleRedirectNewShortUrl} from "../controllers/shortIdRoute.js"

const router = express.Router();

router.get("/:shortId",handleRedirectNewShortUrl);

export default router;