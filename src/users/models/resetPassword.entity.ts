import { Column, Entity } from 'typeorm';

@Entity('auth')
export class ResetPasswordEntity {
    @Column({ default: ''})
    email: string;

    @Column({ default: ''})
    token: string;

    @Column({default: ''})
    password: string;
}
