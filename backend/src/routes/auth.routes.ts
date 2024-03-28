import { Server } from "socket.io";
import { signin, signup  } from "../controllers/auth.controller";
import express, {Router}  from "express";
import { SocketSingleton } from "../SocketSingleton";

const authRoutes = (): Router => {
    const io = SocketSingleton.getInstance();
    const router = express.Router();

    router.post('/signup', async (req, res) => {
        const result  = await signup(req, res);
        if (result.success) {
            console.log("Este es el result ", result);
            io.emit('newUser', result);
            res.status(200).header('auth-token' , result.token).json({ message: result.message, userCreate : result.userCreate});
        } else {
            res.status(500).json({ message: 'Failed to create User' });
        }
    })

    router.post('/signin', async (req, res) => {
        const result  = await signin(req, res);
        if (result.success) {
            console.log("Este es el result ", result);
            io.emit('newUser', result);
            res.status(200).json({ message: result.message, userFound : result.userFound, token : result.token});
        } else {
            res.status(500).json({ message: result.message });
        }
    })

    return router;
};
export default authRoutes;