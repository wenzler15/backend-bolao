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
import { Team } from './models/team.interface';
import { TeamsService } from './teams.service';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post(':league')
  async create(@Param('league') league: number, @Body() post: Team) {

    const response = await this.teamsService.create(league, post);

    return response;
  }

  @Get()
  findAll(@Headers('teamName') teamName: string) {
    return this.teamsService.findAll(teamName);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(id);
  }

  @Patch(':league')
  update(@Param('league') league: number, @Body() updateTeamDto: Team) {
    return this.teamsService.update(league, updateTeamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamsService.remove(id);
  }
}
