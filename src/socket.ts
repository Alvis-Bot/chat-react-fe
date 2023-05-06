import io, {Socket} from "socket.io-client"; // Add this

let socket: Socket | null = null;

const connectSocket = (accessToken: string) => {
    socket = io("http://localhost:3005", {
        reconnection: false,
        query: {
            accessToken,
        }
    });
} // Add this -- our server will run on port 4000, so we connect to it from here

export {socket, connectSocket};