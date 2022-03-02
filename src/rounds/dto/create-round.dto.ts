export class CreateRoundDto {
  leagueId: number;
  round: number;
  homeTeamName: string;
  homeTeamScore: number;
  awayTeamName: string;
  awayTeamScore: number;
  dateRound: Date;
  status: string;
}
