import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RoundsModule } from './rounds/rounds.module';
import { UsersModule } from './users/users.module';

@Module({
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type:'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    RoundsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
