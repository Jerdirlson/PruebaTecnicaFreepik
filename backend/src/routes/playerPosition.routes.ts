import express, {Router}  from "express";
import { SocketSingleton } from "../SocketSingleton";
import { getplayerPosition} from "../controllers/playerPosition.controller";

const playerPositionRoutes = (): Router => {
    const io = SocketSingleton.getInstance();
    const playerPositionRoutes = express.Router();
    /**
     * Obtener todos los teams.
     */
    playerPositionRoutes.get('/getPlayerPositions', async (req, res) => {
        const result  = await getplayerPosition(req, res);
        if (result.success) {
            console.log("Este es el result ", result);
            res.status(200).json({ message: result.message , playerPosition : result.playerPosition});
        } else {
            res.status(500).json({ message: result.message });
        }
    })

    return playerPositionRoutes;
};
export default playerPositionRoutes;