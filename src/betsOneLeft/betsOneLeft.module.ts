import { Module } from '@nestjs/common';
import { BetsOneLeftService } from './betsOneLeft.service';
import {
  BetsOneLeftController,
  BetsRoundsAdminController,
  WinningBetController,
} from './betsOneLeft.controller';
import { BetOneLeftEntity } from './models/betOnelLeft.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoundEntity } from 'src/rounds/models/round.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BetOneLeftEntity, RoundEntity])],
  controllers: [
    BetsOneLeftController,
    BetsRoundsAdminController,
    WinningBetController,
  ],
  providers: [BetsOneLeftService],
})
export class BetsOneLeftModule {}
