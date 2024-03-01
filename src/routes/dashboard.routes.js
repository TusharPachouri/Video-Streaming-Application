import { Router } from "express";
import { getChannelStats, getChannelVideos } from "../controllers/dashboard.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/channel-stats/:channelId").get( getChannelStats);
router.route("/channelVideos/:channelId").get( getChannelVideos);

export default router;