import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PremiumEntity } from './models/premium.entity';
import { PremiumService } from './premium.service';

@Controller('premium')
export class PremiumController {
  constructor(private readonly premiumService: PremiumService) {}

  @Post()
  create(@Body() createPremiumDto: PremiumEntity) {
    return this.premiumService.create(createPremiumDto);
  }

  @Get()
  findAll() {
    return this.premiumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.premiumService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePremiumDto: any) {
    return this.premiumService.update(+id, updatePremiumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.premiumService.remove(+id);
  }
}
