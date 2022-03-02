/* eslint-disable prettier/prettier */
export interface Round {
  id?: number;
  leagueId?: number;
  matchId?: number;
  round?: number;
  homeTeamId?: string;
  homeTeamScore?: number;
  awayTeamId?: string;
  awayTeamScore?: number;
  dateRound?: Date;
  status?: string;
}
