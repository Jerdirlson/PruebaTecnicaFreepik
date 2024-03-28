import { Request, Response } from "express";
import { League } from "interfaces/League";
import { getLeagueService } from "../services/league.service";
interface teamResponse {
    success: boolean;
    message: string;
    leagues?: League[];
}

// export const createTeam = async (req: Request, res: Response) : Promise<teamResponse> => {
//     const team : Team = req.body;
//     try {
//         const response = await createTeamService(team, res);
//         console.log("Response de createTeamService", response);
//         return { success: true, message: 'Player create .'};
//     } catch (error) {
//         console.error("Error updating player: ", error);
//         return { success: false, message: 'Error updating player.' };
//     }
// };

// export const getPlayerById = async (req: Request, res: Response) : Promise<playerResponse> => {
//     const { id } = req.params;
// };

// export const putPlayerById = async (req: Request, res: Response) : Promise<playerResponse> => {
//     const { id } = req.params;
//     const { name, age, team_id, squad_number, position, nationality } = req.body;
// };


// export const deleteLeagueById = async (req: Request, res: Response) : Promise<teamResponse> => {
//     try {
//         const response = await deleteTeamByIdService(req, res);
//         console.log("este es el response de deleteTeamById ", response);
//         return { success: true, message: 'Team delete.'};
//     } catch (error) {
//         console.error("Error delete team: ", error);
//         return { success: false, message: 'Error delete team.' };
//     }
// };


export const getLeagues = async (req: Request, res: Response) : Promise<teamResponse> => {
    try {
        const response = await getLeagueService(res);
        return { success: true, message: 'Leagues found.', leagues : response.data};
    } catch (error) {
        console.error("Error finding team: ", error);
        return { success: false, message: 'Error finding team.' };
    }
}
