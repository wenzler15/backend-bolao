/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BetOneLeftEntity } from './models/betOnelLeft.entity';
import { BetOneLeft } from './models/betOneLeft.interface';
import { AdminAproveEntity } from './models/adminAprove.entity';
@Injectable()
export class BetsOneLeftService {
  constructor(
    @InjectRepository(BetOneLeftEntity)
    private readonly betOneLeftRepository: Repository<BetOneLeftEntity>,
  ) {}

  async create(betOneLeft: BetOneLeft) {
    const userId = betOneLeft.userId;
    const winnerTeamId = betOneLeft.winnerTeamId;
    const matchId = betOneLeft.matchId;

    const betLeftOneExists = await this.betOneLeftRepository.findOne({
      where: { userId, matchId },
    });

    if (betLeftOneExists)
      return {
        message:
          'Bet already placed on this match, please bet on another match',
      };

    const betLeftOneTeamExists = await this.betOneLeftRepository.findOne({
      where: { userId, winnerTeamId },
    });

    if (betLeftOneTeamExists)
      return {
        message:
          'Bet already placed on this team, please bet on another team to win',
      };

    const response = await this.betOneLeftRepository.save(betOneLeft);

    return { message: 'Bet left one created', betLeftOne: response };
  }

  async adminAprove(body: AdminAproveEntity) {
    const { id } = body;
    const bet = await this.betOneLeftRepository.findOne({ where: { id } });

    await this.betOneLeftRepository.save({
      ...bet,
      ...body,
    });

    return { message: 'Bet updated!' };
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
