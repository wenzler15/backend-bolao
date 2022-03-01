import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RoundsModule } from './rounds/rounds.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/bolao'), UsersModule, RoundsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
