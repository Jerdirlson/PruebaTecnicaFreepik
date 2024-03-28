import { Request, Response } from "express";
import { Team } from "interfaces/Team";
import { getTeamsService , deleteTeamByIdService , putInfoTeam , createTeamService} from "../services/teams.service";

interface teamResponse {
    success: boolean;
    message: string;
    teams?: any[];
    team_id?: number;
}

export const createTeam = async (req: Request, res: Response) : Promise<teamResponse> => {
    const team : Team = req.body;
    try {
        const response = await createTeamService(team, res);
        console.log("Response de createTeamService", response);
        return { success: true, message: 'Team create .' , teams : [response.team]};
    } catch (error) {
        console.error("Error updating Team: ", error);
        return { success: false, message: 'Error updating Team.' };
    }
};

// export const getPlayerById = async (req: Request, res: Response) : Promise<playerResponse> => {
//     const { id } = req.params;
// };

// export const putPlayerById = async (req: Request, res: Response) : Promise<playerResponse> => {
//     const { id } = req.params;
//     const { name, age, team_id, squad_number, position, nationality } = req.body;
// };


export const deleteTeamById = async (req: Request, res: Response) : Promise<teamResponse> => {
    try {
        const response = await deleteTeamByIdService(req, res);
        console.log("este es el response de deleteTeamById ", response);
        return { success: true, message: 'Team delete.'};
    } catch (error) {
        console.error("Error delete team: ", error);
        return { success: false, message: 'Error delete team.' };
    }
};


export const getTeams = async (req: Request, res: Response) : Promise<teamResponse> => {
    try {
        const response = await getTeamsService(res);
        console.log("este es el response de getTeamsService ");
        return { success: true, message: 'Teams found.', teams : response.data};
    } catch (error) {
        console.error("Error finding team: ", error);
        return { success: false, message: 'Error finding team.' };
    }
}


export const putTeamById = async (req: Request, res: Response) : Promise<teamResponse> => {
    try {
        const response = await putInfoTeam(req ,res);
        console.log("este es el response de putInfo ", response);
        return { success: true, message: 'Team update.', teams : response?.team};
    } catch (error) {
        console.error("Error finding team: ", error);
        return { success: false, message: 'Error finding team.' };
    }
}