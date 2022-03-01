/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { Repository } from 'typeorm';
import { UserEntity } from './models/user.entity';
import { User } from './models/user.interface';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>) {}

  async create(user: User) {
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: string) {
    return this.userRepository.findByIds([id]);
  }

  update(id: string, updateUserDto: string) {
    // return this.userModel
    //   .findByIdAndUpdate(
    //     {
    //       _id: id,
    //     },
    //     {
    //       $set: updateUserDto,
    //     },
    //     {
    //       new: true,
    //     },
    //   )
    //   .exec();
  }

  remove(id: string) {
    return this.userRepository.delete(id)
  }

}