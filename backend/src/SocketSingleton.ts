import { Server } from "socket.io";

export class SocketSingleton {
  private static instance: Server | null = null;

  private constructor() {}

  static getInstance(): Server {
    if (!SocketSingleton.instance) {
        throw new Error('Socket.io instance not initialized.');
    }
    return SocketSingleton.instance;
    }

    static initialize(server: any, options?: any): void {
        if (!SocketSingleton.instance) {
            SocketSingleton.instance = new Server(server, options);
        }
    }
}