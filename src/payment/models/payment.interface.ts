/* eslint-disable prettier/prettier */
export interface Payment {
    id?: number;
    userId?: number;
    leagueId?: number;
    gameMode?: number;
    round?: number;
    title?: string;
    status?: string;
    price?: number;
    createdAt?: Date;
}
