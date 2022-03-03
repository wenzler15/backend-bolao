/* eslint-disable prettier/prettier */
export interface BetRound {
  id?: number;
  userId?: number;
  round?: number;
  homeTeamId: number;
  homeTeamScore?: number;
  awayTeamScore?: number;
  winnerTeam?: string;
  status?: boolean;
}
