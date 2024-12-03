import { io } from "socket.io-client";

const NODE_SERVER_URL = import.meta.env.VITE_NODE_SERVER_URL;

export const socket = io(NODE_SERVER_URL, {
  autoConnect: false,
});
