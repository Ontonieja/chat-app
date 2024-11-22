import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { io as Client, Socket as ClientSocket } from "socket.io-client";
import { initSocket } from "../services/socket";
import db from "../../prisma/db";

jest.mock("../../prisma/db", () => ({
  message: {
    create: jest.fn(),
  },
}));

describe("Socket.IO Server", () => {
  let io: SocketIOServer;
  let server: ReturnType<typeof createServer>;
  let clientSocket1: ClientSocket;
  let clientSocket2: ClientSocket;

  beforeAll((done) => {
    server = createServer();
    io = initSocket(server);
    server.listen(() => {
      const port = (server.address() as any).port;
      clientSocket1 = Client(`http://localhost:${port}`, {
        query: { userId: "1" },
      });
      clientSocket2 = Client(`http://localhost:${port}`, {
        query: { userId: "2" },
      });
      done();
    });
  });

  afterAll(() => {
    io.close();
    server.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should handle sending and receiving messages", (done) => {
    const mockMessage = {
      message: "Hello again!",
      type: "TEXT",
      recipentId: 2,
      sentAt: new Date().toISOString(),
      isRead: false,
    };

    clientSocket2.on("receiveMessage", (data) => {
      expect(data.message).toBe(mockMessage.message);
      expect(data.type).toBe(mockMessage.type);
      expect(data.senderId).toBe(1);
      expect(data.recipentId).toBe(2);
      done();
    });

    clientSocket1.emit("sendMessage", mockMessage);
  });

  it("should store the message in the database", (done) => {
    const mockMessage = {
      message: "Hello again!",
      type: "TEXT",
      recipentId: 2,
      sentAt: new Date().toISOString(),
      isRead: false,
    };

    clientSocket1.emit("sendMessage", mockMessage);

    setTimeout(() => {
      expect(db.message.create).toHaveBeenCalledWith({
        data: {
          recipentId: 2,
          senderId: 1,
          type: "TEXT",
          message: "Hello again!",
        },
      });
      done();
    }, 100);
  });

  it("should remove user from userSocketMap on disconnect", (done) => {
    clientSocket1.close();

    setTimeout(() => {
      expect(io.sockets.sockets.size).toBe(1);
      done();
    }, 100);
  });
});
