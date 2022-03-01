import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoundDocument = Round & Document;

@Schema()
export class Round {
  @Prop()
  leagueId: number;

  @Prop()
  round: number;

  @Prop()
  homeTeamName: string;

  @Prop()
  homeTeamScore: number;

  @Prop()
  awayTeamName: string;

  @Prop()
  awayTeamScore: number;

  @Prop()
  dateRound: Date;

  @Prop()
  status: string;
}

export const RoundSchema = SchemaFactory.createForClass(Round);
