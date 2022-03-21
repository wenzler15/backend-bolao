import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/models/user.entity';
import { PaymentEntity } from './models/payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, PaymentEntity])],
  controllers: [PaymentController],
  providers: [PaymentService]
})
export class PaymentModule {}
