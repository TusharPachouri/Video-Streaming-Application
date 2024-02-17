import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  addComment,
  getAllComments,
  deleteComment,
  updateComment,
} from "../controllers/comment.controller.js";

const router = Router();

router.route("/:videoId").post(verifyJWT, addComment).get(getAllComments);

router
  .route("/c/:commentId")
  .patch(verifyJWT, updateComment)
  .delete(verifyJWT, deleteComment);

export default router;
