import { Module } from '@nestjs/common';
import { BetsRoundsService } from './betsRounds.service';
import { BetsRoundsController, BetsRoundsAdminController } from './betsRounds.controller';
import { BetRoundEntity } from './models/betRounds.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BetRoundEntity])],
  controllers: [BetsRoundsController, BetsRoundsAdminController],
  providers: [BetsRoundsService],
})
export class BetsRoundsModule {}
