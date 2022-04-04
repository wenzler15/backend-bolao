import { Module } from '@nestjs/common';
import { RoundsService } from './rounds.service';
import { RoundsBetController, RoundsController } from './rounds.controller';
import { RoundEntity } from './models/round.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BetOneLeftEntity } from 'src/betsOneLeft/models/betOnelLeft.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoundEntity, BetOneLeftEntity])],
  controllers: [RoundsController, RoundsBetController],
  providers: [RoundsService],
})
export class RoundsModule {}
