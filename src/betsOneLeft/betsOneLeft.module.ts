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
import { PaymentEntity } from 'src/payment/models/payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BetOneLeftEntity, RoundEntity, PaymentEntity])],
  controllers: [
    BetsOneLeftController,
    BetsRoundsAdminController,
    WinningBetController,
  ],
  providers: [BetsOneLeftService],
})
export class BetsOneLeftModule {}
