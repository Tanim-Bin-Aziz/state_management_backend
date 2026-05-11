import express from "express";
import cors from "cors";
import propertyRoutes from "./src/routes/property.routes";
import authRoutes from "./src/routes/auth.routes";
import adminRoutes from "./src/routes/admin.routes";
const app = express();

app.use(cors());
app.use(express.json());

// base route
app.get("/", (req, res) => {
  res.send("Real Estate API Running 🚀");
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/admin", adminRoutes);
export default app;
