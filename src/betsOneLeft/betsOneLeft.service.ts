/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BetOneLeftEntity } from './models/betOnelLeft.entity';
import { BetOneLeft } from './models/betOneLeft.interface';
import { AdminAproveEntity } from './models/adminAprove.entity';
import { RoundEntity } from 'src/rounds/models/round.entity';
@Injectable()
export class BetsOneLeftService {
  constructor(
    @InjectRepository(BetOneLeftEntity)
    private readonly betOneLeftRepository: Repository<BetOneLeftEntity>,
    @InjectRepository(RoundEntity)
    private readonly roundsRepository: Repository<RoundEntity>
  ) {}

  async create(betOneLeft: BetOneLeft) {
    const {userId, matchId} =  betOneLeft;

    const betLeftOneExists = await this.betOneLeftRepository.findOne({ userId, matchId });

    if(betLeftOneExists)
      return {message: "This user has already betted in this match!"}

    const lastBet = await this.betOneLeftRepository.findOne({ where: { userId }, order: {createdAt : 'DESC'} })

    if(lastBet && lastBet.life === 0)
      return {message: "This user don't have more lifes!"}

    if (betLeftOneExists) return { message: 'Bet left one already exists!' };

    const response = await this.betOneLeftRepository.save(betOneLeft);

    return { message: 'Bet left one created', betLeftOne: response };
  }

  async adminAprove(body: AdminAproveEntity) {
    const {id} = body;
    let winner = 0;
    const bet = await this.betOneLeftRepository.findOne({where: {id}});

    if(!bet)
      return {message: "Bet not found!"}

    if(bet.status)  
      return {message: "Bet has already been updated!"}

    const round = await this.roundsRepository.findOne({matchId: bet.matchId});
    const betAtt = bet;

    if(round.awayTeamScore > round.homeTeamScore) {
      winner = round.awayTeamId;
    } else if (round.homeTeamScore > round.awayTeamScore) {
      winner = round.homeTeamId;
    } else {
      winner = 0;
    }

    if(winner !== bet.winnerTeam) {
      betAtt.life -= 1;
    }

    betAtt.status = true;
    betAtt.winnerTeam = winner;

    await this.betOneLeftRepository.save({
      ...bet,
      ...betAtt,
    });

    return {message: "Bet updated!"}
  }


  findAll() {
    return this.betOneLeftRepository.find();
  }

  findOne(id: string) {
    return this.betOneLeftRepository.findByIds([id]);
  }

  async update(id: string, updateBetOneLeftDto: BetOneLeft) {
    const data = await this.betOneLeftRepository.findOne({ where: { id } });

    if (!data) return { message: 'Bet left one not found' };

    const response = await this.betOneLeftRepository.save({
      ...data,
      ...updateBetOneLeftDto,
    });

    return { message: 'Bet left one updated', betLeftOne: response };
  }

  remove(id: string) {
    return this.betOneLeftRepository.delete(id);
  }
}