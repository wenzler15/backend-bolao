import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoundEntity } from './models/round.entity';
import { Round } from './models/round.interface';
@Injectable()
export class RoundsService {
  constructor(
    @InjectRepository(RoundEntity)
    private readonly roundRepository: Repository<RoundEntity>,
  ) {}

  async create(round: Round) {
    return this.roundRepository.save(round);
  }

  findAll() {
    return this.roundRepository.find();
  }

  findOne(id: string) {
    return this.roundRepository.findByIds([id]);
  }

  update(id: string, updateRoundDto: string) {
    // return this.roundModel
    //   .findByIdAndUpdate(
    //     {
    //       _id: id,
    //     },
    //     {
    //       $set: updateRoundDto,
    //     },
    //     {
    //       new: true,
    //     },
    //   )
    //   .exec();
  }

  remove(id: string) {
    return this.roundRepository.delete(id);
  }
}
