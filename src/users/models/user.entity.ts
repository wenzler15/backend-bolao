import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  email: string;

  @Column({ type: 'integer', default: 0 })
  position: number;

  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  password: string;

  @Column({ default: '' })
  lastName: string;

  @Column({ default: '' })
  pix: string;

  @Column({ default: '' })
  cpf: string;

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

  @Column({ type: 'integer', default: 0 })
  points: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: '' })
  bankName: string;

  @Column({ default: '' })
  profileUrl: string;

  @Column({ default: '' })
  agencyNumber: string;

  @Column({ default: '' })
  accountNumber: string;

  @Column({ default: '' })
  accountType: string;

  @Column({ type: 'integer', default: 0 })
  favoriteTeam: number;

  @Column({ type: 'integer', default: 0 })
  winsNumberLeftOne: number;

  @Column({ type: 'integer', default: 0 })
  winsNumber: number;

  @Column({ default: '' })
  passwordResetToken: string;

  @Column({ default: '', nullable: true })
  facebookToken: string;

  @Column({ type: 'timestamp', nullable: true })
  passwordResetExpires: Date;

  @Column({ default: '', nullable: true })
  googleToken: string;
}
