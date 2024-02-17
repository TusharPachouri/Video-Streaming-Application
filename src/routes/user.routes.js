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
  getUserChannelProfile,
  getWatchHistory,
  deleteUser,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

//Register and login routes:-
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

//secured routes :- Using verifyJWT middleware

// get current user:
router.route("/user").get(verifyJWT, getCurrentUser);

//update details // secure
router.route("/update/password").post(verifyJWT, changeCurrentPassword);

router.route("/update/details").patch(verifyJWT, updateAccountDetails); // emails or fullname

router.route("/update/avatar").patch(
  verifyJWT,
  upload.single("avatar"), 
  updateUserAvatar
);

router.route("/update/cover").patch(
  upload.fields([
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  verifyJWT,
  updateUserCoverImage
);

router.route("/channel/:username").get(verifyJWT, getUserChannelProfile);
router.route("/watch-history").get(verifyJWT, getWatchHistory);

// logout and refresh token change
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(verifyJWT, refreshAccessToken);

// delete user : 
router.route("/delete").delete(verifyJWT, deleteUser);

export default router;
