import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import User from "./models/User.js";

let io;

export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*", // Adjust depending on env
            methods: ["GET", "POST", "PUT", "DELETE"],
        },
    });

    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.auth.token;
            if (!token) throw new Error("Authentication error");
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id).select("-password");
            if (user && user.role === "admin") {
                socket.user = user;
                next();
            } else {
                next(new Error("Unauthorized"));
            }
        } catch (err) {
            next(new Error("Authentication error"));
        }
    });

    io.on("connection", (socket) => {
        console.log("Admin Connected via Socket.IO:", socket.id);

        // Join a room specifically for admins
        socket.join("admins");

        socket.on("disconnect", () => {
            console.log("Admin Disconnected:", socket.id);
        });
    });

    return io;
};

export const getIo = () => {
    if (!io) {
        return null;
    }
    return io;
};
