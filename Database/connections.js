import mongoose from "mongoose";

async function connections() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
}

export default connections;
