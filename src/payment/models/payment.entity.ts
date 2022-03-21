import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payment')
export class PaymentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'integer' ,default: 0})
    userId: number;

    @Column({ type: 'integer' ,default: 0})
    leagueId: number;

    @Column({ type: 'integer' ,default: 0})
    round: number;

    @Column({ default: ''})
    title: string;

    @Column({ default: ''})
    status: string;

    @Column({ type: 'numeric', default: 0})
    price: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;
}