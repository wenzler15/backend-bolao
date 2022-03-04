import { Module } from '@nestjs/common';
import { BetsOneLeftService } from './betsOneLeft.service';
import { BetsOneLeftController, BetsRoundsAdminController } from './betsOneLeft.controller';
import { BetOneLeftEntity } from './models/betOnelLeft.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BetOneLeftEntity])],
  controllers: [BetsOneLeftController, BetsRoundsAdminController],
  providers: [BetsOneLeftService],
})
export class BetsOneLeftModule {}
