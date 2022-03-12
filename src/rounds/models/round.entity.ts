/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('round')
export class RoundEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', default: 0 })
  leagueId: number;

  @Column({ type: 'integer', default: 0 })
  matchId: number;

  @Column({ type: 'integer', default: 0 })
  round: number;

  @Column({ type: 'integer', default: 0 })
  homeTeamId: number;

  @Column({ type: 'integer', default: 0, nullable: true })
  homeTeamScore: number;

  @Column({ type: 'integer', default: 0 })
  awayTeamId: number;

  @Column({ type: 'integer', default: 0, nullable: true })
  awayTeamScore: number;

  @Column({ type: 'timestamp', nullable: true })
  dateRound: Date;

  @Column({ type: 'timestamp', nullable: true })
  dateRoundLocked: Date;

  @Column({ default: '' })
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
