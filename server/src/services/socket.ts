import { Server as HttpServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import db from "../../prisma/db";

export const initSocket = (httpServer: HttpServer) => {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
      credentials: true,
    },
  });

  const userSocketMap = new Map();

  const disconnect = (socket: Socket) => {
    console.log(`User disconnected: ${socket.id}`);
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  };

  io.on("connection", (socket: Socket) => {
    const userId = Number(socket.handshake.query.userId);

    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`User connected: ${userId}, socketId: ${socket.id}`);
    } else {
      console.log("User ID not provided");
    }

    socket.on("sendMessage", async (data) => {
      const recipentSocketId = userSocketMap.get(data.recipentId);
      const senderSocketId = userSocketMap.get(userId);

      if (recipentSocketId) {
        io.to(recipentSocketId).emit("receiveMessage", {
          message: data.message,
          type: data.type,
          senderId: userId,
          recipentId: data.recipentId,
          sentAt: data.sentAt,
          isRead: data.isRead,
        });
      }
      if (senderSocketId) {
        io.to(senderSocketId).emit("receiveMessage", {
          message: data.message,
          type: data.type,
          senderId: userId,
          recipentId: data.recipentId,
          sentAt: data.sentAt,
          isRead: data.isRead,
        });
      }
      if (data.type === "FILE") return;

      await db.message.create({
        data: {
          recipentId: data.recipentId,
          senderId: userId,
          type: data.type,
          message: data.message,
        },
      });
    });
    socket.on("disconnect", () => disconnect(socket));
  });

  return io;
};
