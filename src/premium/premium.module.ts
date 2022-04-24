import { Module } from '@nestjs/common';
import { PremiumService } from './premium.service';
import { PremiumController } from './premium.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PremiumEntity } from './models/premium.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PremiumEntity])],
  controllers: [PremiumController],
  providers: [PremiumService]
})
export class PremiumModule {}
