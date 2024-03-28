import express, {Router}  from "express";
import { createPlayer, getPlayers , putPlayerById , deletePlayerById} from "../controllers/player.controller";
import { SocketSingleton } from "../SocketSingleton";

const playerRoutes = (): Router => {
    const io = SocketSingleton.getInstance();
    const playerRoutes = express.Router();

    playerRoutes.post('/createPlayer', async (req, res) => {
        const result  = await createPlayer(req, res);
        if (result.success) {
            console.log("Este es el result ", result);
            io.emit('newPlayer', result);
            res.status(200).json({ message: result.message});
        } else {
            res.status(500).json({ message: 'Failed to create User' });
        }
    })

    // /**
    //  * Obtener un futbolista por el id.
    //  */
    // playerRoutes.get('/getPlayer/:id', async (req, res) => {
    //     const result  = await getPlayerById(req, res);
    //     if (result.success) {
    //         console.log("Este es el result ", result);
    //         io.emit('getPlayer', result);
    //         res.status(200).json({ message: result.message});
    //     } else {
    //         res.status(500).json({ message: result.message });
    //     }
    // })

    // /**
    //  * Actualizar un futbolista por su ID.
    //  */
    // playerRoutes.put('/putPlayer/:id', async (req, res) => {
    //     const result  = await getPlayerById(req, res);
    //     if (result.success) {
    //         console.log("Este es el result ", result);
    //         io.emit('getPlayer', result);
    //         res.status(200).json({ message: result.message});
    //     } else {
    //         res.status(500).json({ message: result.message });
    //     }
    // })

    /**
     * Deletear un player por su id.
     */
    playerRoutes.delete('/deletePlayer/:id', async (req, res) => {
        const result  = await deletePlayerById(req, res);
        if (result.success) {
            console.log("Este es el result ", result);
            res.status(200);
            io.emit('deletePlayerSocket', req.params.id);
        } else {
            res.status(500).json({ message: result.message });
        }
    })

    /**
     * Obtener todos los jugadores.
     */
    playerRoutes.get('/getPlayers', async (req, res) => {
        const result  = await getPlayers(req, res);
        if (result.success) {
            console.log("Este es el result ", result);
            res.status(200).json({ message: result.message , players : result.players});
        } else {
            res.status(500).json({ message: result.message });
        }
    })


    /**
     * Hacer update 
     * team_name
        country_id
        league_id
     */
        playerRoutes.put('/updatePlayer', async (req, res) => {
        const result  = await putPlayerById(req, res);
        if (result.success) {
            console.log("Este es el result ", result);
            res.status(200);
            io.emit('updatePlayer', result)
        } else {
            res.status(500).json({ message: result.message });
        }
    })

    return playerRoutes;
};
export default playerRoutes;