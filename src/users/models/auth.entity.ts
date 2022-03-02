import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('auth')
export class AuthEntity {
    @Column({ default: ''})
    email: string;

    @Column({ default: ''})
    password: string;
}
