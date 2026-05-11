import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("❌ MONGO_URI is not defined");
}

// ✅ global type-safe cache
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// extend globalThis safely
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

// initialize cache
const cached: MongooseCache = global.mongooseCache || {
  conn: null,
  promise: null,
};

global.mongooseCache = cached;

const connectDB = async (): Promise<typeof mongoose> => {
  // if already connected
  if (cached.conn) {
    return cached.conn;
  }

  try {
    // if no promise yet → create connection
    if (!cached.promise) {
      cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => {
        return mongoose;
      });
    }

    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;

    console.error("❌ MongoDB connection failed:", error);

    throw new Error("Database connection failed");
  }
};

export default connectDB;
