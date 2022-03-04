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
    // const round = betOneLeft.round;

    // const betLeftOneExists = await this.betOneLeftRepository.findOne({ where: { round } });

    // if (betLeftOneExists) return { message: 'Bet left one already exists' };

    const response = await this.betOneLeftRepository.save(betOneLeft);

    return { message: 'Bet left one created', betLeftOne: response };
  }

  async adminAprove(body: AdminAproveEntity) {
    const {id, status} = body;
    const bet = await this.betOneLeftRepository.findOne({where: {id}});

    await this.betOneLeftRepository.save({
      ...bet,
      ...body,
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
