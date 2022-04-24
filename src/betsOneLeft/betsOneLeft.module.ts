import { Module } from '@nestjs/common';
import { BetsOneLeftService } from './betsOneLeft.service';
import {
  BetsOneLeftController,
  BetsRoundsAdminController,
  UserBetLeftOneController,
  WinningBetController,
} from './betsOneLeft.controller';
import { BetOneLeftEntity } from './models/betOnelLeft.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoundEntity } from 'src/rounds/models/round.entity';
import { PaymentEntity } from 'src/payment/models/payment.entity';
import { UserEntity } from 'src/users/models/user.entity';
import { NotificationEntity } from 'src/notifications/models/notifications.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BetOneLeftEntity, RoundEntity, PaymentEntity, UserEntity, NotificationEntity])],
  controllers: [
    BetsOneLeftController,
    BetsRoundsAdminController,
    WinningBetController,
    UserBetLeftOneController
  ],
  providers: [BetsOneLeftService],
})
export class BetsOneLeftModule {}
