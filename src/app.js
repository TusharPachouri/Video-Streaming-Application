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

//routes declarations :-
app.use("/api/v1/users", userRouter);

export { app };
