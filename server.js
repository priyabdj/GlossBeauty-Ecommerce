import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow any localhost origin for development
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return callback(null, true);
    }
    
    // For production, add your actual frontend domains here
    const allowedOrigins = [
      'https://gloss-beauty-frontend.vercel.app'
    ];
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

// Basic routes
app.get("/", (req, res) => {
  res.json({ 
    message: " Ecommerce Backend API", 
    status: "running",
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: "/auth",
      login: "/auth/login",
      register: "/auth/register", 
      profile: "/auth/profile",
      logout: "/auth/logout",
      orders: "/orders",
      createOrder: "/orders (POST)",
      getUserOrders: "/orders (GET)"
    }
  });
});

app.get("/health", (req, res) => {
  res.json({ 
    status: "healthy", 
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.use("/auth", authRoutes);
app.use("/orders", orderRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(" MongoDB Connected");
    app.listen(process.env.PORT, () => {
      console.log(` Server running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
  });