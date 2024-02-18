import { ApiError } from "../utils/ApiError.js";
import mongoose from "mongoose";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Like } from "../models/like.models.js";
import { Comment } from "../models/comment.models.js";
import { Video } from "../models/video.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if (!videoId) {
    throw new ApiError(400, "Video Id required");
  }
  const likedBy = req.user._id; //if user logged in
  try {
    const existingLike = await Like.findOne({ video: videoId, likedBy });
    if (existingLike) {
      await existingLike.deleteOne();
      res.status(200).json(new ApiResponse(200, "Like Removed Successfully"));
    } else {
      const newLike = await Like.create({
        video: videoId,
        likedBy,
      });
      res
        .status(200)
        .json(
          new ApiResponse(
            200,
            await newLike.populate("likedBy", "username"),
            "Like Added Successfully"
          )
        );
    }
  } catch (error) {
    res
      .status(500)
      .json(
        new ApiResponse(500, "Error While Toggling like button in a video")
      );
  }
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  if (!commentId) {
    throw new ApiError(400, "comment Id required");
  }
  const likedBy = req.user._id; //if user logged in
  try {
    const existingLike = await Like.findOne({ comment: commentId, likedBy });
    if (existingLike) {
      await existingLike.deleteOne();
      res.status(200).json(new ApiResponse(200, "Like Removed Successfully"));
    } else {
      const newLike = await Like.create({
        comment: commentId,
        likedBy,
      });
      res
        .status(200)
        .json(
          new ApiResponse(
            200,
            await newLike.populate("likedBy", "username"),
            "Like Added Successfully"
          )
        );
    }
  } catch (error) {
    res
      .status(500)
      .json(
        new ApiResponse(500, "Error While Toggling like button in a comment")
      );
  }
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  if (!tweetId) {
    throw new ApiError(400, "tweet Id required");
  }
  const likedBy = req.user._id; //if user logged in
  try {
    const existingLike = await Like.findOne({ tweet: tweetId, likedBy });
    if (existingLike) {
      await existingLike.deleteOne();
      res.status(200).json(new ApiResponse(200, "Like Removed Successfully"));
    } else {
      const newLike = await Like.create({
        tweet: tweetId,
        likedBy,
      });
      res
        .status(200)
        .json(
          new ApiResponse(
            200,
            await newLike.populate("likedBy", "username"),
            "Like Added Successfully"
          )
        );
    }
  } catch (error) {
    res
      .status(500)
      .json(
        new ApiResponse(500, "Error While Toggling like button in a comment")
      );
  }
});

// const getLikedVideos = asyncHandler(async (req, res) => {
//   const { userId } = req.params;

//   try {
//     // const likes = await Like.find({ likedBy: userId });
//     // const videoIds = likes.map((like) => like.video);
//     const likedVideosCount = await Video.aggregate([
//       {
//         $match: {
//           "likes.likedBy": new mongoose.Types.ObjectId(userId),
//         },
//       },
//       {
//         $lookup: {
//           from: "likes",
//           localField: "_id",
//           foreignField: "video",
//           as: "likesCount",
//         },
//       },
//       {
//         $addFields: {
//           likesCount: { $size: "$likes" },
//         },
//       },

//       {
//         $project: {
//           _id: 1,
//           title: 1,
//           description: 1,
//           // owner: 1,
//           createdAt: 1,
//           likesCount: 1,
//         },
//       },
//     ]);

//     // Retrieve videos based on the extracted video ids
//     // Assuming you have a Video model
//     // const likedVideos = await Video.find({ _id: { $in: videoIds } });
//     return res.status(200).json({ success: true, data: likedVideosCount });
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal server error" });
//   }
// });

const getLikedVideos = asyncHandler(async (req, res) => {
  const userId = req.params.userId || req.user._id;
  try {
    const likedVideos = await Video.aggregate([
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "video",
          as: "likes",
        },
      },
      {
        $match: {
          "likes.likedBy": new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $addFields: {
          likesCount: { $size: "$likes" },
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          owner: 1,
          duration: 1,
          createdAt: 1,
          likesCount: { $size: "$likes" },
        },
      },
    ]);

    return res.status(200).json({ success: true, data: likedVideos });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

const getLikedComments = asyncHandler(async (req, res) => {
  const userId = req.params.userId || req.user._id;
  try {
    const likedVideos = await Comment.aggregate([
      {
        $match: {
          "likes.likedBy": new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "comment",
          as: "likes",
        },
      },

      {
        $addFields: {
          likesCount: { $size: "$likes" },
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          owner: 1,
          duration: 1,
          createdAt: 1,
          likesCount: { $size: "$likes" },
        },
      },
    ]);

    return res.status(200).json({ success: true, data: likedVideos });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

export { toggleVideoLike, toggleCommentLike, toggleTweetLike, getLikedVideos };
