import { Module } from '@nestjs/common';
import { RoundsService } from './rounds.service';
import { RoundsBetController, RoundsController } from './rounds.controller';
import { RoundEntity } from './models/round.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BetOneLeftEntity } from 'src/betsOneLeft/models/betOnelLeft.entity';
import { BetRoundEntity } from 'src/betsRounds/models/betRounds.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoundEntity, BetOneLeftEntity, BetRoundEntity])],
  controllers: [RoundsController, RoundsBetController],
  providers: [RoundsService],
})
export class RoundsModule {}
