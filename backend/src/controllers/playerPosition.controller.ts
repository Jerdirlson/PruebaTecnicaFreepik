import { Request, Response } from "express";
import { Nationality } from "interfaces/Nationality";
import { getplayerPositionService } from "../services/playerPosition.service";
interface playerPositionResponse {
    success: boolean;
    message: string;
    playerPosition?: Nationality[];
}


export const getplayerPosition = async (req: Request, res: Response) : Promise<playerPositionResponse> => {
    try {
        const response = await getplayerPositionService(res);
        return { success: true, message: 'playerPositions found.', playerPosition : response.data};
    } catch (error) {
        console.error("Error finding team: ", error);
        return { success: false, message: 'Error finding team.' };
    }
}
