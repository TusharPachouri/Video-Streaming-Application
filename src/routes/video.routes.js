import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getVideoById,
  publishAVideo,
  togglePublishStatus,
  updateDetailsVideo,
} from "../controllers/video.controller.js";

const router = Router();

// routes:
router.route("/publish").post(
  verifyJWT,
  upload.fields([
    {
      name: "videoFile",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  publishAVideo
);
router.route("/:videoId").get(verifyJWT, getVideoById);

router.route("/:videoId").patch(
  verifyJWT,
  upload.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  updateDetailsVideo
);

router.route("/:videoId").patch(verifyJWT, togglePublishStatus);

export default router;
