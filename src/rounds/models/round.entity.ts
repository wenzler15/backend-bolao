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
  homeTeamId: string;

  @Column({ type: 'integer', default: 0, nullable: true })
  homeTeamScore: number;

  @Column({ default: '' })
  awayTeamId: string;

  @Column({ type: 'integer', default: 0, nullable: true })
  awayTeamScore: number;

  @Column({ type: 'timestamp', nullable: true })
  dateRound: Date;

  @Column({ default: '' })
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
