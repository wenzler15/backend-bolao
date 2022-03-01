import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './models/user.entity';
import { User } from './models/user.interface';
const bcrypt = require("bcryptjs");

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>) {}

  async create(user: User) {
    return this.userRepository.save(user);
  }

  async findAll() {
    const response = await this.userRepository.find();

    response.forEach((item) => {
      item.password = undefined;
    })

    return response;
  }

  async findOne(id: string) {
    const response = await this.userRepository.findByIds([id]);

    response[0].password = undefined;

    return response[0];
  }

  async update(id: string, updateUserDto: User) {
    
   const data = await this.userRepository.findOne({ where: {id}});

   if(updateUserDto.password) {
    updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
   } 

   const response = await this.userRepository.save({
     ...data,
     ...updateUserDto
   });

   response.password = undefined;

   return response;
  }

  remove(id: string) {
    return this.userRepository.delete(id)
  }

}