import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { subscriptionLogsToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { AuthEntity } from './models/auth.entity';
import { User } from './models/user.interface';
import { UsersService } from './users.service';
const bcrypt = require("bcryptjs");

@Controller('auth')
export class UserAuth {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async auth(@Body() body: AuthEntity) {
    return this.usersService.auth(body);
  }
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
    async create(@Body() post: User) {
    
    post.password = await bcrypt.hash(post.password, 10);

    return this.usersService.create(post)
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: User) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
