import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('notification')
export class NotificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', default: 0 })
  userId: number;

  @Column({ type: 'integer', default: 0 })
  read: number;

  @Column({ default: '' })
  message: string;

  @Column({ default: '' })
  gameMode: string;
}


