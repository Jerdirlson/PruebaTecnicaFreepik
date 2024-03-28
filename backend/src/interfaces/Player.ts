export interface Player {
    player_id? : number;
    name : string;
    age : number;
    team_id : number;
    squad_number : number;
    position_id : number;
    nationality_id : number;
}

export interface PlayerSanitized {
    age: number;
    player_id: number;
    player_name: string;
    position_name: string,
    nationality_name: string
}