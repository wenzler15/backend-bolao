import { Module } from '@nestjs/common';
import { LeaguesService } from './leagues.service';
import { LeaguesController } from './leagues.controller';
import { LeagueEntity } from './models/league.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([LeagueEntity])],
  controllers: [LeaguesController],
  providers: [LeaguesService],
})
export class LeaguesModule {}
