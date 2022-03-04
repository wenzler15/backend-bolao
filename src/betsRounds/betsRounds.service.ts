/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminAproveEntity } from './models/adminAprove.entity';
import { BetRoundEntity } from './models/betRounds.entity';
import { BetRound } from './models/betRounds.interface';
@Injectable()
export class BetsRoundsService {
  constructor(
    @InjectRepository(BetRoundEntity)
    private readonly betRoundRepository: Repository<BetRoundEntity>,
  ) {}

  async create(betRound: BetRound) {
    const response = await this.betRoundRepository.save(betRound);

    return { message: 'Bet round created', betRound: response };
  }

  async adminAprove(body: AdminAproveEntity) {
    const {id} = body;
    const bet = await this.betRoundRepository.findOne({where: {id}});

    await this.betRoundRepository.save({
      ...bet,
      ...body,
    });

    return {message: "Bet updated!"}
  }

  findAll() {
    return this.betRoundRepository.find();
  }

  findOne(id: string) {
    return this.betRoundRepository.findByIds([id]);
  }

  async update(id: string, updateBetroundDto: BetRound) {
    const data = await this.betRoundRepository.findOne({ where: { id } });

    if (!data) return { message: 'Bet left one not found' };

    const response = await this.betRoundRepository.save({
      ...data,
      ...updateBetroundDto,
    });

    return { message: 'Bet round updated', betRound: response };
  }

  remove(id: string) {
    return this.betRoundRepository.delete(id);
  }
}
