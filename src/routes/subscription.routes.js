import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  toggleSubscription,
  getUserChannelSubscribers,
  getSubscribedChannels,
} from "../controllers/subscription.controller.js";

const router = Router();

router.route("/toggle-subs/:channelId").post(verifyJWT, toggleSubscription);
router.route("/sub-count/:channelId").get(verifyJWT, getUserChannelSubscribers);

router
  .route("/sub-channel/:subscriberId")
  .get(getSubscribedChannels);

export default router;
