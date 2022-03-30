import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { SendGridModule } from '@anchan828/nest-sendgrid';
import { RoundsModule } from './rounds/rounds.module';
import { TeamsModule } from './teams/teams.module';
import { BetsOneLeftModule } from './betsOneLeft/betsOneLeft.module';
import { BetsRoundsModule } from './betsRounds/betsRounds.module';
import { LeaguesModule } from './leagues/leagues.module';
import { NewsModule } from './news/news.module';
import { PaymentModule } from './payment/payment.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
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
    LeaguesModule,
    NewsModule,
    PaymentModule,
    NotificationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
