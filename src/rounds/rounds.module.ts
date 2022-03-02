import { Module } from '@nestjs/common';
import { RoundsService } from './rounds.service';
import { RoundsController } from './rounds.controller';
import { Round, RoundSchema } from './entities/round.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Round.name, schema: RoundSchema }]),
  ],
  controllers: [RoundsController],
  providers: [RoundsService],
})
export class RoundsModule {}
