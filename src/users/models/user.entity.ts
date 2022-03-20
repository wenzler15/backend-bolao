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
    lastName: string;

    @Column({ default: ''})
    password: string;

    @Column({ type: 'integer', default: 0 })
    favoriteTeam: number;

    @Column({ type: 'integer', default: 0 })
    codeArea: number;

    @Column({ type: 'integer', default: 0 })
    phone: number;

    @Column({ default: 0 })
    zipCode: string;

    @Column({ default: 0 })
    streetName: string;

    @Column({ type: 'integer', default: 0 })
    houseNumber: number;

    @Column({ type: 'integer', default: 0 })
    cpf: number;

    @Column({ type: 'integer', default: 0 })
    points: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({ default: ''})
    passwordResetToken: string;

    @Column({default: '', nullable: true})
    facebookToken: string;

    @Column({default: '', nullable: true})
    googleToken: string;

    @Column({ type: 'timestamp', nullable: true})
    passwordResetExpires: Date;
}


