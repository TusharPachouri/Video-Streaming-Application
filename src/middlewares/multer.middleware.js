import multer from "multer";

const storage = multer.diskStorage({
  storage: multer.memoryStorage(),
  // if we want to save the file in our disk and then send to the server:-
  // it will send file to the public /temp first the send to the server
  // destination: function (req, file, cb) {
  //   cb(null, "./public/temp");
  // },
  // filename: function (req, file, cb) {
  //   cb(null, file.originalname);
  // },
});

export const upload = multer({
  storage,
});
