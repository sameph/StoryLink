import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGODB_URI}/StoryLink`);
    console.log(`Database connected: ${ conn.connection.host }`);
  }
  catch (error) {
    console.log("Error connecting to database: ", error.message);
    process.exit(1);
  }
}
