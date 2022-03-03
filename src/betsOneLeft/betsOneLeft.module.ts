import { Module } from '@nestjs/common';
import { BetsOneLeftService } from './betsOneLeft.service';
import { BetsOneLeftController } from './betsOneLeft.controller';
import { BetOneLeftEntity } from './models/betOnelLeft.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BetOneLeftEntity])],
  controllers: [BetsOneLeftController],
  providers: [BetsOneLeftService],
})
export class BetsOneLeftModule {}
