import { Response, Request } from "express";
import { Team } from "interfaces/Team";
import { DataBase, initDatabase } from "../providers/database";
import { OkPacket } from "mysql";
import { League } from "interfaces/League";

/**
 * Metodo para la creacion de teams 
 * @param team
 * @returns 
 */

// export async function createPlayerService(player: Team, res : Response) {
//     try {
//         console.log("este es el player ", player);
//         const db: DataBase = await initDatabase(res)
//         const playerData = [
//             name , age.toString(), team_id.toString() , squad_number.toString(), position_id.toString(), nationality_id.toString()
//         ]
//         const query = 'INSERT INTO Player (name, age, team_id, squad_number, position_id , nationality_id) VALUES (?,?,?,?,?,?)';
//         const result: OkPacket = await db.insertQuery(query, playerData)
//         if ( result.insertId > 0){
//             return { success: true, message: 'Player created successfully.'};
//         }
//         return { success: false, message: 'Error creating player.' };
//     } catch (error) {
//         console.error('Error creating user:', error);
//         return { success: false, message: 'Error creating player.' };
//     }

// }

/**
 * Metodo para obtener todas las ligas.
 */

export async function getLeagueService(res : Response) {
    try {
        const db: DataBase = await initDatabase(res)
        const query = 'SELECT league_id , name FROM League';
        const result : League[] = await db.readQuery(query, [])
        console.log(result);
        return { success: true, message: 'Leagues found.', data: result };
    } catch (error) {
        console.error('Error getting leagues:', error);
        return { success: false, message: 'Error getting leagues.' };
    }
}


export const deleteTeamByIdService = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const db: DataBase = await initDatabase(res);

        const query = 'CALL TeamDeleter(?)';
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