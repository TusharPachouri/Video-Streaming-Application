import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  toggleCommentLike,
  toggleTweetLike,
  toggleVideoLike,
  getLikedVideos,
} from "../controllers/like.controller.js";

const router = Router();
router.use(verifyJWT); // for all the routes in this router

router.route("/toggle/v/:videoId").post(toggleVideoLike);
router.route("/toggle/c/:commentId").post(toggleCommentLike);
router.route("/toggle/t/:tweetId").post(toggleTweetLike);

router.route("/videos").get(getLikedVideos); //it will return the liked videos by the logged in user
router.route("/videos/:userId").get(getLikedVideos); //it will return the liked videos by the user with userId  


export default router;
