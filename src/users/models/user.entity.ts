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

    @Column({ default: '' })
    codeArea: string;

    @Column({ default: '' })
    phone: string;

    @Column({ default: '' })
    zipCode: string;

    @Column({ default: '' })
    streetName: string;

    @Column({ type: 'integer', default: 0 })
    houseNumber: number;

    @Column({ default: '' })
    cpf: string;

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


