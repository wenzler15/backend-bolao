/* eslint-disable prettier/prettier */
import { Column, Entity } from 'typeorm';

@Entity('betRoundAdmin')
export class AdminAproveEntity {
  @Column({ type: 'integer', default: 0 })
  id: number;

  @Column({ default: false })
  status: boolean;
}
