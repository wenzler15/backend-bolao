/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Headers,
  Delete,
} from '@nestjs/common';
import { BetRound } from './models/betRounds.interface';
import { BetsRoundsService } from './betsRounds.service';
import { AdminAproveEntity } from './models/adminAprove.entity';

@Controller('userBet')
export class UserBetController{
  constructor(private readonly betsRoundService: BetsRoundsService) {}

  @Get(':id')
  getBet(@Param('id') id: string) {
    return this.betsRoundService.getBet(id);
  }
}

@Controller('betsRound/admin')
export class BetsRoundsAdminController {
  constructor(private readonly betsRoundService: BetsRoundsService) {}

  @Post()
  create(@Body() post: AdminAproveEntity) {
    return this.betsRoundService.adminAprove(post);
  }
}

@Controller('winningBetsRound')
export class WinningBetController {
  constructor(private readonly betsRoundService: BetsRoundsService) {}

  @Get(':id')
  winningBet(@Param('id') id: string) {
    return this.betsRoundService.getWinningBet(id);
  }
}

@Controller('betsRound')
export class BetsRoundsController {
  constructor(private readonly betsRoundService: BetsRoundsService) {}

  @Post()
  async create(@Body() post: BetRound) {

    const response = await this.betsRoundService.create(post);

    return response;
  }

  @Get()
  findAll() {
    return this.betsRoundService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.betsRoundService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBetRoundDto: BetRound) {
    return this.betsRoundService.update(id, updateBetRoundDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.betsRoundService.remove(id);
  }
}
