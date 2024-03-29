import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { SendGridModule } from '@anchan828/nest-sendgrid';
import { RoundsModule } from './rounds/rounds.module';
import { TeamsModule } from './teams/teams.module';
import { BetsOneLeftModule } from './betsOneLeft/betsOneLeft.module';
import { BetsRoundsModule } from './betsRounds/betsRounds.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    SendGridModule.forRoot({
      apikey: process.env.SEND_GRID_KEY,
    }),
    RoundsModule,
    TeamsModule,
    BetsOneLeftModule,
    BetsRoundsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
