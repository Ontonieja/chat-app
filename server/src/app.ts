import express from "express";
import { Request, Response } from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.post("/users", (req: Request, res: Response) => {
  res.send({}).status(200);
});

export { app, httpServer, io };
