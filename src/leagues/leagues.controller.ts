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
import { League } from './models/league.interface';
import { LeaguesService } from './leagues.service';

@Controller('leagues')
export class LeaguesController {
  constructor(private readonly leaguesService: LeaguesService) {}

  @Post()
  async create(@Body() post: League) {

    const response = await this.leaguesService.create(post);

    return response;
  }

  @Get()
  findAll() {
    return this.leaguesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leaguesService.findOne(id);
  }

  @Patch()
  update(@Body() updateLeagueDto: League) {
    return this.leaguesService.update(updateLeagueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leaguesService.remove(id);
  }
}
