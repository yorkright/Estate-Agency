import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

let cached = global.mongoose || { conn: null, promise: null };
export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "realestateDB",
    }).then((mongoose) => mongoose);
  }
  cached.promise.then(() => {
    console.log("MongoDB connected successfully!");
  });
  cached.conn = await cached.promise;
  return cached.conn;
}
