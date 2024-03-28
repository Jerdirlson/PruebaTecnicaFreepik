import { io, Socket } from 'socket.io-client';

class SocketSingleton {
    private static instance: Socket | null = null;
    private static serverUrl = 'http://localhost:8081';

  // Método para obtener una instancia del socket
  static getInstance(): Socket {
    if (!SocketSingleton.instance) {
      SocketSingleton.instance = io(this.serverUrl);
    }
    return SocketSingleton.instance;
  }

  // Método para obtener la instancia del link del back.
  static getServerUrl(): string {
    return SocketSingleton.serverUrl;
  }
}

export default SocketSingleton;
