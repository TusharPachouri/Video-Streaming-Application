import { Router } from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
  updateAccountDetails,
  changeCurrentPassword,
  updateUserAvatar,
  updateUserCoverImage,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);
router.route("/login").post(loginUser);

// get current user:
router.route("/user").post(verifyJWT, getCurrentUser);

//update details // secure
router.route("/update/password").post(verifyJWT, changeCurrentPassword);
router.route("/update/details").post(verifyJWT, updateAccountDetails); // emails or fullname
router.route("/update/avatar").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  verifyJWT,
  updateUserAvatar
);
router.route("/update/cover").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  verifyJWT,
  updateUserCoverImage
);

//secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(verifyJWT, refreshAccessToken);

export default router;
