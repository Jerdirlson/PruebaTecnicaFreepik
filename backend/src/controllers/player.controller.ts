import { Request, Response } from "express";
import { createPlayerService ,getPlayersService , putInfoPlayer ,deletePlayerByIdService} from "../services/player.service";
import { Player } from "interfaces/Player";

interface playerResponse {
    success: boolean;
    message: string;
    players? : any;
}

export const createPlayer = async (req: Request, res: Response) : Promise<playerResponse> => {
    const player : Player = req.body;
    try {
        const response = await createPlayerService(player, res);
        console.log("Response de singup", response);
        return { success: true, message: 'Player create .', players : response?.player};
    } catch (error) {
        console.error("Error updating player: ", error);
        return { success: false, message: 'Error updating player.' };
    }
};


export const getPlayers = async (req: Request, res: Response) : Promise<playerResponse> => {
    try {
        const response = await getPlayersService(res);
        return { success: true, message: 'Teams found.', players : response.data};
    } catch (error) {
        console.error("Error finding team: ", error);
        return { success: false, message: 'Error finding team.' };
    }
}



export const putPlayerById = async (req: Request, res: Response) : Promise<playerResponse> => {
    try {
        const response = await putInfoPlayer(req ,res);
        console.log("este es el response de putInfo ", response);
        return { success: true, message: 'Team update.', players : response?.players};
    } catch (error) {
        console.error("Error finding team: ", error);
        return { success: false, message: 'Error finding team.' };
    }
}


export const deletePlayerById = async (req: Request, res: Response) : Promise<playerResponse> => {
    try {
        const response = await deletePlayerByIdService(req, res);
        console.log("este es el response de deleteTeamById ", response);
        return { success: true, message: 'Team delete.'};
    } catch (error) {
        console.error("Error delete team: ", error);
        return { success: false, message: 'Error delete team.' };
    }
};