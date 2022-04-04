import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PremiumEntity } from './models/premium.entity';

@Injectable()
export class PremiumService {
  constructor(
    @InjectRepository(PremiumEntity)
    private readonly premiumRepository: Repository<PremiumEntity>,
  ) {}

  create(createPremiumDto: PremiumEntity) {
    return this.premiumRepository.save(createPremiumDto);
  }

  findAll() {
    return `This action returns all premium`;
  }

  findOne(id: number) {
    return `This action returns a #${id} premium`;
  }

  update(id: number, updatePremiumDto: PremiumEntity) {
    return `This action updates a #${id} premium`;
  }

  remove(id: number) {
    return `This action removes a #${id} premium`;
  }
}
