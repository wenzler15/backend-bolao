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
import { subscriptionLogsToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { AuthEntity } from './models/auth.entity';
import { ResetPasswordEntity } from './models/resetPassword.entity';
import { User } from './models/user.interface';
import { UsersService } from './users.service';
const bcrypt = require('bcryptjs');

@Controller('auth')
export class UserAuth {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  auth(@Body() body: AuthEntity) {
    return this.usersService.auth(body);
  }
}

@Controller('forgot_password')
export class UserForgotPassword {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  forgotPassword(@Body() email: any) {
    return this.usersService.forgotPassword(email.email);
  }
}

@Controller('reset_password')
export class UserResetPassword {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  resetPassword(@Body() body: ResetPasswordEntity) {
    return this.usersService.resetPassword(body);
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
