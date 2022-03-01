import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoundsService } from './rounds.service';
import { CreateRoundDto } from './dto/create-round.dto';
import { UpdateRoundDto } from './dto/update-round.dto';

@Controller('rounds')
export class RoundsController {
  constructor(private readonly roundsService: RoundsService) {}

  @Post()
  create(@Body() createRoundDto: CreateRoundDto) {
    return this.roundsService.create(createRoundDto);
  }

  @Get()
  findAll() {
    return this.roundsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roundsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoundDto: UpdateRoundDto) {
    return this.roundsService.update(id, updateRoundDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roundsService.remove(id);
  }
}
