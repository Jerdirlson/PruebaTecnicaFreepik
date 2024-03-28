import { Response , Request} from "express";
import { Player } from "interfaces/Player";
import { DataBase, initDatabase } from "../providers/database";
import { OkPacket } from "mysql";

/**
 * Metodo para la creacion de players 
 * @param player
 * @returns 
 */

export async function createPlayerService(player: any, res : Response) {
    try {
        console.log("este es el player ", player);
        const { name, age, team_id, squad_number, position_id, nationality_id } = player;
        const db: DataBase = await initDatabase(res)
        const query = 'INSERT INTO Player (name, age, team_id, squad_number, position_id , nationality_id) VALUES (?,?,?,?,?,?)';
        const result: OkPacket = await db.insertQuery(query, [ name , age, team_id , squad_number, position_id, nationality_id])
        if ( result.insertId > 0){
            player.player_id = result.insertId;
            return { success: true, message: 'Player created successfully.', player : player};
        }
        return { success: false, message: 'Error creating player.' };
    } catch (error) {
        console.error('Error creating user:', error);
        return { success: false, message: 'Error creating player.' };
    }

}



export const deletePlayerByIdService = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const db: DataBase = await initDatabase(res);

        const query = 'CALL PlayerDeleter(?)';
        const result = await db.readQuery(query, [id])

        console.log("Este es el result 11111", result);
        // Enviar una respuesta exitosa
        res.status(200).json({ success: true, message: 'Team deleted successfully' });
    } catch (error) {
        // Manejar errores
        console.error('Error deleting team:', error);
        res.status(500).json({ success: false, message: 'Failed to delete team' });
    }
};


/**
 * Metodo para obtener los jugadores.
 */

export async function getPlayersService(res : Response) {
    try {
        const db: DataBase = await initDatabase(res)
        const query = 'SELECT * FROM Player';
        const result = await db.readQuery(query, [])
        console.log("ESte es el result del select * from player ", result);
        return { success: true, message: 'Teams found.', data: result };
    } catch (error) {
        console.error('Error getting teams:', error);
        return { success: false, message: 'Error getting teams.' };
    }
}


export const putInfoPlayer = async (req: Request, res: Response) => {
    const { player_id, age , name , position_id,nationality_id,squad_number,team_id   } = req.body;

    try {
        const db: DataBase = await initDatabase(res);

        const query = 'UPDATE Player SET name = ?, age = ?, team_id = ?, squad_number = ? , position_id = ? , nationality_id = ? WHERE player_id = ?';
        const result = await db.insertQuery(query, [name, age, team_id, squad_number, position_id, nationality_id, player_id])

        const players = await getPlayersService(res);

        console.log("Este es el result 123123123", players);
        // Enviar una respuesta exitosa
        return { success: true, message: 'Teams found.', players: players.data};
    } catch (error) {
        // Manejar errores
        console.error('Error deleting team:', error);
        res.status(500).json({ success: false, message: 'Failed to delete team' });
    }
};