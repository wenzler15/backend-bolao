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
import { BetRound } from './models/betRounds.interface';
import { BetsRoundsService } from './betsRounds.service';

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
