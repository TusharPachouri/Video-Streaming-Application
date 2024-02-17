import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Comment } from "../models/comment.models.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { compare } from "bcrypt";

const addComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  if (!content) {
    throw new ApiError(400, "Comment is can't be empty");
  }
  const videoId = req.params.videoId;

  const comment = await Comment.create({
    content,
    video: videoId,
    owner: req.user?._id,
  });
  return res.status(200).json(new ApiResponse(200, comment, "Comment Added"));
});

const getAllComments = asyncHandler(async (req, res) => {
  const videoId = req.params.videoId;
  if (!videoId) {
    throw new ApiError(400, "video not found...");
  }
  const allComments = await Comment.find({ video: videoId }).populate(
    "owner",
    "username"
  );
  return res
    .status(200)
    .json(
      new ApiResponse(200, allComments, "All Comments fetched successfully")
    );
});

const updateComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  if (!content) {
    throw new ApiError(400, "Comment content is Required!!!");
  }
  const commentId = req.params.commentId;
  const comment = await Comment.findByIdAndUpdate(
    commentId,
    {
      $set: {
        content: content,
      },
    },
    { new: true }
  );
  if (!comment) {
    throw new ApiError(400, "Comment not found");
  }
  return res.status(200).json(new ApiResponse(200, comment, "Comment Updated"));
});

const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findByIdAndDelete(req.params.commentId);
  if (!comment) {
    throw new ApiError(400);
  }
  return res.status(200).json(new ApiResponse(200, comment, "Comment Deleted"));
});

export { addComment, getAllComments, updateComment, deleteComment };
