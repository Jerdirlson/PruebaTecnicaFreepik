import express, {Router}  from "express";
import { SocketSingleton } from "../SocketSingleton";
import { getNationalities } from "../controllers/nationalities.controller";

const nationalitiesRoutes = (): Router => {
    const io = SocketSingleton.getInstance();
    const nationalitiesRoutes = express.Router();
    /**
     * Obtener todos los teams.
     */
    nationalitiesRoutes.get('/getNationalities', async (req, res) => {
        const result  = await getNationalities(req, res);
        if (result.success) {
            console.log("Este es el result ", result);
            res.status(200).json({ message: result.message , nationalities : result.nationalities});
        } else {
            res.status(500).json({ message: result.message });
        }
    })

    return nationalitiesRoutes;
};
export default nationalitiesRoutes;