import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Subscription } from "../models/subscription.models.js";
import mongoose from "mongoose";

const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  const userId = req.user?._id;
  if (!userId && !channelId) {
    throw new ApiError(401, "Unauthorized");
  }
  const channel = await User.findById(channelId);
  if (!channel) {
    throw new ApiError(404, "Channel not found");
  }
  const isSubscribed = await Subscription.findOne({
    subscriber: userId,
    channel: channelId,
  });
  if (isSubscribed) {
    await Subscription.findByIdAndDelete(isSubscribed._id);
    return res
      .status(200)
      .json(new ApiResponse(200, isSubscribed, "unSubscribed successfully"));
  }
  const subscription = await Subscription.create({
    channel: channelId,
    subscriber: userId,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, subscription, "Subscribed successfully"));
});

const getChannelSubscribers = asyncHandler(async (req, res) => {
  // const userId = req.user?._id;
  const { channelId } = req.params;
  if (!channelId) {
    throw new ApiError(401, "Unauthorized");
  }
  // const subscribers = await Subscription.find({channel: userId}).populate('subscriber', 'username')
  const subscriberCount = await Subscription.aggregate([
    { $match: { channel: new mongoose.Types.ObjectId(channelId) } },
    { $group: { _id: "$channel", subscriberCount: { $sum: 1 } } },
  ]);
  if (subscriberCount.length === 0)
    return res
      .status(200)
      .json(
        new ApiResponse(200, { subscriberCount: 0 }, "No Subscribers found")
      );
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        subscriberCount,
        "Subscriber Count fetched successfully"
      )
    );
});

const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { subscriberId } = req.params;
  if (!subscriberId) {
    throw new ApiError(401, "Unauthorized");
  }
  const subscribedChannels = await Subscription.find({
    subscriber: subscriberId,
  }).populate("channel", "username");
  if(subscribedChannels.length === 0) {
    return res.status(200).json(new ApiResponse(200, [], "No Subscribed Channels found"));
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {subscribedChannels,
        subscribedChannel: subscribedChannels.length},
        "Subscribed Channels fetched successfully"
      )
    );
});

export { toggleSubscription, getChannelSubscribers, getSubscribedChannels };
