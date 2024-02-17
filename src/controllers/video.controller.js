import { Video } from "../models/video.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  if (!title && !description) {
    return next(new ApiError(400, "Title and description are required"));
  }

  //video upload to cloudinary
  const videoLocalPath = req.files?.videoFile[0]?.path;
  if (!videoLocalPath) {
    throw new ApiError(400, "Video file is required");
  }
  const videoFile = await uploadOnCloudinary(videoLocalPath);

  console.log(videoFile); //

  //thumbnail upload to cloudinary
  const thumbnailLocalPath = req.files?.thumbnail[0]?.path;
  if (!thumbnailLocalPath) {
    throw new ApiError(400, "Thumbnail is required");
  }
  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

  const video = await Video.create({
    title,
    description,
    videoFile: videoFile.url,
    thumbnail: thumbnail.url,
    duration: videoFile.duration,
    owner: req.user._id,
  });

  const publishedVideo = await Video.findById(video._id).populate(
    "owner",
    "username"
  );

  return res
    .status(201)
    .json(new ApiResponse(201, publishedVideo, "Video created successfully"));
});

const getVideoById = asyncHandler(async (req, res) => {
  const videoId = req.params.videoId;
  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, "Video not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video Found Successfully"));
});

const updateDetailsVideo = asyncHandler(async (req, res) => {
  const videoId = req.params.videoId;
  const { title, description } = req.body;
  if (!title && !description) {
    throw new ApiError(400, "title and description is needed");
  }
  const thumbnailLocalPath = req.files?.thumbnail[0]?.path;

  if (!thumbnailLocalPath) {
    throw new ApiError(400, "thumbnail is needed");
  }
  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
  const oldVideoDetails = await Video.findById(videoId);
  const oldThumbnailURL = oldVideoDetails.thumbnail;

  const video = await Video.findByIdAndUpdate(
    videoId,
    {
      $set: {
        title,
        description,
        thumbnail: thumbnail.url,
      },
    },
    { new: true }
  ).populate("owner", "username");
  await deleteFromCloudinary(oldThumbnailURL);
  return res.status(200).json(new ApiResponse(200, video, "Details Updated"));
});

const deleteVideo = asyncHandler(async (req, res) => {
  const videoId = req.params.videoId;
  const video = await Video.findByIdAndDelete(videoId);
  if (!video) {
    throw new ApiError(404, "Video not found");
  }
  await deleteFromCloudinary(video.videoFile);
  await deleteFromCloudinary(video.thumbnail);
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Video deleted successfully"));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const videoId = req.params.videoId;
  const { isPublished } = req.body;
  const video = await Video.findByIdAndUpdate(
    videoId,
    {
      $set: {
        isPublished: isPublished,
      },
    },
    { new: true }
  );
  if (!video) {
    throw new ApiError(400, "Video Not Found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "isPublished value toggled"));
});

export {
  publishAVideo,
  getVideoById,
  updateDetailsVideo,
  deleteVideo,
  togglePublishStatus,
};
