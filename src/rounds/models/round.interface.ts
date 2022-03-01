/* eslint-disable prettier/prettier */
export interface Round {
  id?: number;
  leagueId?: number;
  round?: number;
  homeTeamName?: string;
  homeTeamScore?: number;
  awayTeamName?: string;
  awayTeamScore?: number;
  dateRound?: Date;
  status?: string;
}
