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

    @Column({ type: 'integer', default: 0 })
    favoriteTeam: number;

    @Column({ type: 'integer', default: 0 })
    points: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({ default: ''})
    passwordResetToken: string;

    @Column({default: '', nullable: true})
    facebookToken: string;

    @Column({ type: 'timestamp', nullable: true})
    passwordResetExpires: Date;
}
