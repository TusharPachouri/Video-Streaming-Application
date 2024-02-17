import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
// app.use("/", (req, res) => {
//   res.json({ message: "hello from my side" });
// });
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(
  express.json({
    limit: "16kb",
  })
);
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//import router:=
import userRouter from "./routes/user.routes.js";
import videoRouter from "./routes/video.routes.js";
import commentRouter from "./routes/comment.routes.js"
import healthcheckRouter  from "./routes/healthcheck.routes.js";

//routes declarations :-
app.use("/api/v1/users", userRouter);
app.use("/api/v1/healthcheck",healthcheckRouter)
app.use("/api/v1/videos", videoRouter);
app.use("/api/v1/comment", commentRouter);

export { app };
