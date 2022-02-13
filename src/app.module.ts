import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/bolao'), UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
