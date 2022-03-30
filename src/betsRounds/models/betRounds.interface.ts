/* eslint-disable prettier/prettier */
export interface BetRound {
  id?: number;
  userId?: number;
  round?: number;
  homeTeamId: number;
  homeTeamScore?: number;
  awayTeamScore?: number;
  matchId?: number;
  winnerTeam?: number;
  status?: boolean;
}
