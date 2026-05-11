import connectDB from "../src/config/db";
import app from "../app";

const handler = async (req: any, res: any) => {
  await connectDB();
  return app(req, res);
};

export default handler;
