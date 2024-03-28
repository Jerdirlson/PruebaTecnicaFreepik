import express, {Router}  from "express";
import { getTeams , deleteTeamById , putTeamById , createTeam} from "../controllers/team.controller";
import { SocketSingleton } from "../SocketSingleton";

const teamRoutes = (): Router => {
    const io = SocketSingleton.getInstance();
    const teamRoutes = express.Router();

    teamRoutes.post('/createTeam', async (req, res) => {
        const result  = await createTeam(req, res);
        if (result.success) {
            console.log("Este es el result ", result);
            res.status(200);
            io.emit('newTeam', result.teams);
        } else {
            res.status(500).json({ message: 'Failed to create User' });
        }
    })

    // /**
    //  * Obtener un futbolista por el id.
    //  */
    // teamRoutes.get('/getTeam/:id', async (req, res) => {
    //     const result  = await getTeamById(req, res);
    //     if (result.success) {
    //         console.log("Este es el result ", result);
    //         io.emit('getPlayer', result);
    //         res.status(200).json({ message: result.message});
    //     } else {
    //         res.status(500).json({ message: result.message });
    //     }
    // })

    // /**
    //  * Actualizar un team por su ID.
    //  */
    // teamRoutes.put('/putTeam/:id', async (req, res) => {
    //     const result  = await putTeamById(req, res);
    //     if (result.success) {
    //         console.log("Este es el result ", result);
    //         io.emit('getPlayer', result);
    //         res.status(200).json({ message: result.message});
    //     } else {
    //         res.status(500).json({ message: result.message });
    //     }
    // })

    /**
     * Deletear un team por su id.
     */
    teamRoutes.delete('/deleteTeam/:id', async (req, res) => {
        // io.emit('testSocket', { message: 'Hola desde el frontend' });
        const result = await deleteTeamById(req, res);
        if (result.success) {
            console.log("Este es el result ", result);
            console.log("Pasa por aqui");
            res.status(200);
            io.emit('deleteTeamSocket', req.params.id);
        } else {
            res.status(500).json({ message: result.message });
        }
    })

    /**
     * Obtener todos los teams.
     */
    teamRoutes.get('/getTeams', async (req, res) => {
        const result  = await getTeams(req, res);
        if (result.success) {
            console.log("Este es el result ", result);
            res.status(200).json({ message: result.message , teams : result.teams});
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
    teamRoutes.put('/updateTeam', async (req, res) => {
        const result  = await putTeamById(req, res);
        if (result.success) {
            console.log("Este es el result ", result);
            res.status(200);
            io.emit('updateTeam', result)
        } else {
            res.status(500).json({ message: result.message });
        }
    })

    return teamRoutes;
};
export default teamRoutes;