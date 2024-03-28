import { Player , PlayerSanitized } from "./Player";

export interface Team {
    team_id? : number;
    name : string;
    league_id : number;
    country_id : number
    players? : Player[];
    players_sanitized? : PlayerSanitized[];
}