# Video Streaming Application

## Description

This project is a video streaming application developed from scratch using Node.js, MongoDB, JWT, bcrypt, and Cloudinary. It allows users to create accounts, upload videos, and customize their profiles with avatar and cover photos. The application securely manages user authentication and authorization using JSON Web Tokens (JWT) and bcrypt to protect user credentials and control access to restricted endpoints. Cloudinary API is integrated for storing and serving videos and avatar cover photos, ensuring scalability and efficient delivery of multimedia content. The application exposes RESTful APIs for user registration, login, video uploading, profile customization, and fetching video content. Error handling and validation techniques are employed to enhance the robustness and reliability of the application. Additionally, the application is deployed on a cloud platform to ensure high availability and scalability to accommodate increasing user demand.

## Deployment

The backend of this application is deployed on [Vercel](https://back-end-learn-ki2q.vercel.app/api/v1/users/register) to ensure high availability and accessibility.

The application is deployed on a cloud platform for high availability and scalability. Ensure that the necessary cloud configurations and deployment scripts are in place for successful deployment.

## Features

- User registration and authentication
- Video uploading and streaming
- Profile customization with avatar cover photos
- Secure authentication using JWT and bcrypt
- Integration with Cloudinary for media storage and delivery
- RESTful APIs for user management, content retrieval, likes, comments, subscriptions, and dashboard statistics
- Error handling and validation for improved reliability
- Cloud deployment for scalability and availability

## Technologies Used

- Node.js
- MongoDB
- JSON Web Tokens (JWT)
- bcrypt
- Cloudinary

## Installation

1. Clone the repository: `git clone https://github.com/TusharPachouri/Video-Streaming-Application.git`
2. Install dependencies: `npm install`
3. Set up environment variables:
   - Create a `.env` file based on the provided `.env.example` template
   - Update the variables with your MongoDB connection string, Cloudinary credentials, and other necessary configurations
4. Start the application: `npm start`

## API Endpoints

### User Routes

- **Register and Login Routes:**
  - `POST /api/v1/users/register`: Register a new user.
  - `POST /api/v1/users/login`: Login user.

- **Secured Routes (Require JWT):**
  - `GET /api/v1/users/user`: Get current user.
  - `GET /api/v1/users/user/:userId`: Get user by ID.
  - `POST /api/v1/users/update/password`: Update user password.
  - `PATCH /api/v1/users/update/details`: Update user details.
  - `PATCH /api/v1/users/update/avatar`: Update user avatar.
  - `PATCH /api/v1/users/update/cover`: Update user cover photo.
  - `GET /api/v1/users/channel/:username`: Get user channel profile.
  - `GET /api/v1/users/watch-history`: Get user watch history.
  - `POST /api/v1/users/logout`: Logout user.
  - `POST /api/v1/users/refresh-token`: Refresh access token.
  - `DELETE /api/v1/users/delete`: Delete user.

### Video Routes

- **Routes:**
  - `POST /api/v1/videos/publish`: Publish a video.
  - `GET /api/v1/videos/current-video/:videoId`: Get details of a specific video.
  - `PATCH /api/v1/videos/update-details/:videoId`: Update details of a video.
  - `PATCH /api/v1/videos/toggle/publish/:videoId`: Toggle the publish status of a video.

### Like Routes

- **Toggle Like Routes:**
  - `POST /api/v1/likes/toggle/v/:videoId`: Toggle like on a video.
  - `POST /api/v1/likes/toggle/c/:commentId`: Toggle like on a comment.
  - `POST /api/v1/likes/toggle/t/:tweetId`: Toggle like on a tweet.

- **Liked Videos Routes:**
  - `GET /api/v1/likes/videos`: Get liked videos by the logged-in user.
  - `GET /api/v1/likes/videos/:userId`: Get liked videos by a specific user.

### Comments Routes

- **Comments on Video Route:**
  - `POST /api/v1/comments/:videoId`: Add a comment to a video.
  - `GET /api/v1/comments/:videoId`: Get all comments for a video.

- **Individual Comment Routes:**
  - `PATCH /api/v1/comments/c/:commentId`: Update a comment by comment ID.
  - `DELETE /api/v1/comments/c/:commentId`: Delete a comment by comment ID.

### Subscription Routes

- **Toggle Subscription Route:**
  - `POST /api/v1/subscriptions/toggle-subs/:channelId`: Toggle subscription status for a channel.

- **Channel Subscribers Count Route:**
  - `GET /api/v1/subscriptions/sub-count/:channelId`: Get the number of subscribers for a channel.

- **Subscribed Channels Route:**
  - `GET /api/v1/subscriptions/sub-channel/:subscriberId`: Get the channels subscribed by a user.

### Dashboard Routes

- **Channel Statistics Route:**
  - `GET /api/v1/dashboard/channel-stats/:channelId`: Get statistics for a specific channel.

- **Channel Videos Route:**
  - `GET /api/v1/dashboard/channelVideos/:channelId`: Get videos uploaded by a specific channel.
