import { Response, Request } from "express";
import { Team } from "interfaces/Team";
import { DataBase, initDatabase } from "../providers/database";
import { OkPacket } from "mysql";

/**
 * Metodo para la creacion de teams 
 * @param team
 * @returns 
 */

export async function createTeamService(team: Team, res : Response) {
    try {
        console.log("este es el player ", team);
        const { name , country_id , league_id } = team;
        const db: DataBase = await initDatabase(res)
        const teamData = [
            name , country_id.toString() , league_id.toString()
        ]
        const query = 'INSERT INTO Team (name, country_id, league_id) VALUES (?,?,?)';
        const result: OkPacket = await db.insertQuery(query, teamData)
        console.log("RESULT ", result);
        team.team_id = result.insertId;
        if ( result.insertId > 0){
            return { success: true, message: 'Team created successfully.', team : team};
        }
        return { success: false, message: 'Error creating Team.' };
    } catch (error) {
        console.error('Error creating Team:', error);
        return { success: false, message: 'Error creating Team.' };
    }

}

/**
 * Metodo para obtener los equipos con sus respectivos jugadores.
 */

export async function getTeamsService(res : Response) {
    try {
        const db: DataBase = await initDatabase(res)
        const query = 'CALL GetAllTeamsAndPlayers()';
        const result = await db.readQuery(query, [])
        const teamsWithPlayers = (result[0] as any[]).map(row => {
            const players = JSON.parse(row.players);
            return {
                team_id: row.team_id,
                team_name: row.team_name,
                league_id: row.league_id,
                country_id: row.country_id,
                players: players
            };
        });
        console.log(teamsWithPlayers);
        return { success: true, message: 'Teams found.', data: teamsWithPlayers };
    } catch (error) {
        console.error('Error getting teams:', error);
        return { success: false, message: 'Error getting teams.' };
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

export const putInfoTeam = async (req: Request, res: Response) => {
    const { team_id, name , country_id , league_id} = req.body;

    try {
        const db: DataBase = await initDatabase(res);

        const query = 'UPDATE Team SET name = ?, country_id = ?, league_id = ? WHERE team_id = ?';
        const result = await db.insertQuery(query, [name, country_id, league_id, team_id])

        const teams = await getTeamsService(res);

        console.log("Este es el result 11111", teams);
        // Enviar una respuesta exitosa
        return { success: true, message: 'Teams found.', team: teams.data};
    } catch (error) {
        // Manejar errores
        console.error('Error deleting team:', error);
        res.status(500).json({ success: false, message: 'Failed to delete team' });
    }
};