import mongoose from 'mongoose';
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    // console.log(connectionInstance)
    console.log(`MONGODB Connected!!! DB host: ${connectionInstance.connection.host}`);
  } catch (err) {
    console.log(`MongoDB connection Error:`, err);
    process.exit(1);
  }
};
export default connectDB;



// console.log(process.env.MONGODB_URL)
// mongoose.set("strictQuery", false);
// const mongoDB = process.env.MONGODB_URI;

// main().catch((err) => console.log(err));
// async function main() {
//   await mongoose.connect(`${mongoDB}/${DB_NAME}`);
//   console.log(`connected to Mongoose server ${mongoDB}/${DB_NAME}`);
// }
