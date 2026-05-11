import { configDotenv } from "dotenv";

configDotenv();
import app from "./app";
import connectDB from "./src/config/db";

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on ${PORT}`);
  });
};

start();
