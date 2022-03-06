/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('betOneLeft')
export class BetOneLeftEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', default: 0 })
  userId: number;

  @Column({ type: 'integer', default: 3 })
  life: number;
  
  @Column({ type: 'integer', default: 0 })
  matchId: number;

  @Column({ type: 'integer', default: 0 })
  winnerTeam: number;

  @Column({ default: false })
  status: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}