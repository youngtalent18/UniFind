import mongoose from "mongoose";

export const connectDB = async() => {
    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI is not configured");
    }
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 10000,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
}

export default connectDB;
