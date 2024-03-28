import { Response, Request } from "express";
import { Team } from "interfaces/Team";
import { DataBase, initDatabase } from "../providers/database";
import { OkPacket } from "mysql";
import { PlayerPosition } from "interfaces/PlayerPosition";
/**
 * Metodo para obtener todas las ligas.
 */

export async function getplayerPositionService(res : Response) {
    try {
        const db: DataBase = await initDatabase(res)
        const query = 'SELECT position_id , name FROM Player_Position';
        const result : PlayerPosition[] = await db.readQuery(query, [])
        console.log(result);
        return { success: true, message: 'playerPositions found.', data: result };
    } catch (error) {
        console.error('Error getting playerPositions:', error);
        return { success: false, message: 'Error getting playerPositions.' };
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