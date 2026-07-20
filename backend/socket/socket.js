import { Server } from "socket.io";
import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

const userSocketMap = new Map();

export const getReceiverSocketId = (userId) => userSocketMap.get(userId.toString());

io.on("connection", (socket) => {
  socket.on("join", (userId) => {
    if (!userId) return;
    userSocketMap.set(userId.toString(), socket.id);
    socket.join(userId.toString());
  });

  socket.on("disconnect", () => {
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) userSocketMap.delete(userId);
    }
  });
});

export { app, io, server };
