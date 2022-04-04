import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('premium')
export class PremiumEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'integer', default: 0})
  round: number;

  @Column({type: 'integer', default: 0})
  leagueId: number;
  
  @Column({type: 'float', default: 0})
  firstPlacePremium: number;

  @Column({type: "float", default: 0})
  secondPlacePremium: number;

  @Column({type: 'float', default: 0})
  thirdPlacePremium: number;

  @Column({ default: '' })
  gameMode: string;
}

