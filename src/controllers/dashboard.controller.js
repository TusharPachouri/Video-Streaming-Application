import { User } from "../models/user.models.js";
import { Like } from "../models/like.models.js";
import { Subscription } from "../models/subscription.models.js";
import { Video } from "../models/video.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
// import { Subscription } from "../models/subscription.models.js";
import mongoose from "mongoose";
const getChannelStats = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  const subscribers = await Subscription.find({ channel: channelId }).populate(
    "channel",
    "username"
  );
  if (!subscribers) {
    throw new ApiError(400, "Channel not found");
  }

  const videos = await Video.find({ owner: channelId, isPublished: true });

  const likes = await Like.find({ "video.owner": channelId }).populate(
    "likedBy",
    "username"
  );

  return res.status(200).json(
    new ApiResponse(200, {
      subscribers,
      totalSubscribers: subscribers.length,
      videos,
      totalVideos: videos.length,
      likes,
      totalLikes: likes.length,
    })
  );
});
const getChannelVideos = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  const videos = await Video.find({
    owner: channelId,
    isPublished: true,
  }).populate("owner", "username");
  if (!videos) {
    throw new ApiError(400, "Channel not found");
  }
  if (videos.length === 0) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          `There are no Videos to be fetched on channel name : ${videos[0].owner.username}`
        )
      );
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { totalVideos: videos.length, videos },
        `Videos fetched successfully of channel name: ${videos[0].owner.username}`
      )
    );
});

export { getChannelStats, getChannelVideos };
