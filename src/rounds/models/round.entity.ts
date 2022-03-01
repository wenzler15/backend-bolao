/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('round')
export class RoundEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', default: 0 })
  leagueId: number;

  @Column({ type: 'integer', default: 0 })
  round: number;

  @Column({ default: '' })
  homeTeamName: string;

  @Column({ type: 'integer', default: 0 })
  homeTeamScore: number;

  @Column({ default: '' })
  awayTeamName: string;

  @Column({ type: 'integer', default: 0 })
  awayTeamScore: number;

  @Column({ type: 'timestamp' })
  dateRound: Date;

  @Column({ default: '' })
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
