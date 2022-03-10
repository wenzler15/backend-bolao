import { Module } from '@nestjs/common';
import { BetsRoundsService } from './betsRounds.service';
import {
  BetsRoundsController,
  BetsRoundsAdminController,
  WinningBetController,
} from './betsRounds.controller';
import { BetRoundEntity } from './models/betRounds.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/models/user.entity';
import { RoundEntity } from 'src/rounds/models/round.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([BetRoundEntity, UserEntity, RoundEntity]),
  ],
  controllers: [
    BetsRoundsController,
    BetsRoundsAdminController,
    WinningBetController,
  ],
  providers: [BetsRoundsService],
})
export class BetsRoundsModule {}
