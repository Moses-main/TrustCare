// backend/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/auth.js";
// import patientRoutes from "./routes/patients.js";
// import providerRoutes from "./routes/providers.js";
// import recordRoutes from "./routes/records.js";
// import blockchainRoutes from "./routes/blockchain.js";
import socketInjector from "./middleware/socketInjector.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

// use the socket injector
app.use(socketInjector(io));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Database connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/dhrs", {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

// Routes
app.use("/api/auth", authRoutes);
// app.use("/api/patients", patientRoutes);
// app.use("/api/providers", providerRoutes);
// app.use("/api/records", recordRoutes);
// app.use("/api/blockchain", blockchainRoutes);

// Socket.io events
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-room", (userId) => {
    socket.join(userId);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 4500;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { app, io };
