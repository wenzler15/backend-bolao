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
  Headers,
} from '@nestjs/common';
import { Round } from './models/round.interface';
import { RoundsService } from './rounds.service';

@Controller('roundsLeftOne')
export class RoundsBetController {
  constructor(private readonly roundsService: RoundsService) {}

  @Get(':id')
  findAll(@Param('id') id: string, @Headers('leagueId') leagueId: string, @Headers('userId') userId: string) {
    return this.roundsService.findAllBet(id, leagueId, userId);
  }
}

@Controller('rounds')
export class RoundsController {
  constructor(private readonly roundsService: RoundsService) {}

  @Post(':league')
  async create(@Param('league') league: number, @Body() post: Round) {

    const response = await this.roundsService.create(league, post);

    return response;
  }

  @Get()
  findAll(@Headers('dateGame') gameDate: string, @Headers('leagueId') leagueId: string) {
    return this.roundsService.findAll(gameDate, leagueId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roundsService.findOne(id);
  }

  @Patch(':league')
  update(@Param('league') league: number, @Body() updateRoundDto: Round) {
    return this.roundsService.update(league, updateRoundDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roundsService.remove(id);
  }
}
