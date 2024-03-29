import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController, UserAuth, UserForgotPassword, UserResetPassword } from './users.controller';
import { UserEntity } from './models/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [UsersController, UserAuth, UserForgotPassword, UserResetPassword],
  providers: [UsersService],
})
export class UsersModule {}
