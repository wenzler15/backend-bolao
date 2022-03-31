/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('team')
export class TeamEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', default: 0 })
  leagueId: number;

  @Column({ type: 'integer', default: 0 })
  teamId: number;

  @Column({ default: '' })
  teamName: string;

  @Column({ default: null })
  teamEmblemUrl : string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
