import { Tweet } from "../models/tweet.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTweet = asyncHandler(async (req, res) => {
  const { content } = req.body;
  if (!content) {
    throw new ApiError(400, "Tweet Content is required");
  }
  const tweet = await Tweet.create({
    content,
    owner: req.user?._id,
  });
  //   await tweet.populate("owner", "username");

  if (!tweet) {
    throw new ApiError(400, "Error While creating Tweet");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        await tweet.populate("owner", "username"),
        "Tweet is created successfully"
      )
    );
});

const getUserTweets = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const tweets = await Tweet.find({ owner: userId });

  return res
    .status(200)
    .json(new ApiResponse(200, tweets, "User tweets retrieved successfully"));
});

const updateTweet = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const tweetId = req.params.tweetId;
  if (!content) {
    throw new ApiError(400, "Content of tweet is required");
  }
  const updatedTweet = await Tweet.findByIdAndUpdate(
    tweetId,
    {
      $set: {
        content: content,
      },
    },
    { new: true }
  );
  if (!updatedTweet) {
    throw new ApiError(404, "Error while updating the Tweet");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, updatedTweet, "Tweet updated successfully"));
});

const deleteTweet = asyncHandler(async (req, res) => {
  const tweetId = req.params.tweetId;
  if (!tweetId) {
    throw new ApiError(400, "Tweet not found!");
  }
  const tweet = await Tweet.findByIdAndDelete(tweetId, { new: true });
  return res
    .status(200)
    .json(new ApiResponse(200, tweet, "tweet deleted successfully"));
});

export { createTweet, deleteTweet, updateTweet, getUserTweets };
