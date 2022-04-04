/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BetOneLeft } from './models/betOneLeft.interface';
import { BetsOneLeftService } from './betsOneLeft.service';
import { AdminAproveEntity } from './models/adminAprove.entity';

@Controller('userBetLeftOne')
export class UserBetLeftOneController{
  constructor(private readonly betsOneLeftService: BetsOneLeftService) {}

  @Get(':id')
  getBet(@Param('id') id: string) {
    return this.betsOneLeftService.getBet(id);
  }
}

@Controller('betsOneLeft/admin')
export class BetsRoundsAdminController {
  constructor(private readonly betsOneLeftService: BetsOneLeftService) {}

  @Post()
  create(@Body() post: AdminAproveEntity) {
    return this.betsOneLeftService.adminAprove(post);
  }
}

@Controller('winningBetsOneLeft')
export class WinningBetController {
  constructor(private readonly betsOneLeftService: BetsOneLeftService) {}

  @Get(':id')
  winningBet(@Param('id') id: string) {
    return this.betsOneLeftService.getWinningBet(id);
  }
} 

@Controller('betsOneLeft')
export class BetsOneLeftController {
  constructor(private readonly betsOneLeftService: BetsOneLeftService) {}

  @Post()
  async create(@Body() post: BetOneLeft) {

    const response = await this.betsOneLeftService.create(post);

    return response;
  }

  @Get()
  findAll() {
    return this.betsOneLeftService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.betsOneLeftService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBetLeftOneDto: BetOneLeft) {
    return this.betsOneLeftService.update(id, updateBetLeftOneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.betsOneLeftService.remove(id);
  }
}
