/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BetRoundEntity } from './models/betRounds.entity';
import { BetRound } from './models/betRounds.interface';
@Injectable()
export class BetsRoundsService {
  constructor(
    @InjectRepository(BetRoundEntity)
    private readonly betRoundRepository: Repository<BetRoundEntity>,
  ) {}

  async create(betRound: BetRound) {
    // const round = betOneLeft.round;

    // const betLeftOneExists = await this.betOneLeftRepository.findOne({ where: { round } });

    // if (betLeftOneExists) return { message: 'Bet left one already exists' };

    const response = await this.betRoundRepository.save(betRound);

    return { message: 'Bet round created', betRound: response };
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
