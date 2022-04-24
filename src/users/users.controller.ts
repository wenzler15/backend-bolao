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
  Query,
} from '@nestjs/common';
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

@Controller('check_payment')
export class CheckPayment {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  checkPayment(@Body() body: any) {
    return this.usersService.checkPayment(body);
  }
}

@Controller('social_login')
export class SocialLogin {
  constructor(private readonly usersService: UsersService) {}
  
  @Post()
  loginSocial(@Body() body: any) {
    return this.usersService.loginSocial(body);
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

@Controller('ranking')
export class RankingController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  raking(@Query('id') id: number, @Query('league') league: number,  @Query('round') round: number) {
    return this.usersService.getRanking(id, league, round);
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

  @Get('historyBets/:id')
  historyBets(@Param('id') id: string) {
    return this.usersService.historyBets(id);
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
