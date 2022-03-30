import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController, UserAuth, UserForgotPassword, UserResetPassword, RankingController, SocialLogin, CheckPayment } from './users.controller';
import { UserEntity } from './models/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BetOneLeftEntity } from 'src/betsOneLeft/models/betOnelLeft.entity';
import { BetRoundEntity } from 'src/betsRounds/models/betRounds.entity';
import { PaymentEntity } from 'src/payment/models/payment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, PaymentEntity])
  ],
  controllers: [UsersController, UserAuth, UserForgotPassword, UserResetPassword, RankingController, SocialLogin, CheckPayment],
  providers: [UsersService],
})
export class UsersModule {}
