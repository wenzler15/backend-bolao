import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: ''})
    email: string;

    @Column({ default: ''})
    name: string;

    @Column({ default: ''})
    password: string;

    @Column({ default: ''})
    favoriteTeam: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({ default: ''})
    passwordResetToken: string;

    @Column({ type: 'timestamp', nullable: true})
    passwordResetExpires: Date;
}
