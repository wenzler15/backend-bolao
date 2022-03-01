import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthEntity } from './models/auth.entity';
import { UserEntity } from './models/user.entity';
import { User } from './models/user.interface';
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>) {}

  async create(user: User) {
    const email = user.email;

    const userExists = await this.userRepository.findOne({ where: {email}}); 

    if(userExists) 
      return {message: "User already exists"}

    const response = await this.userRepository.save(user);
    
    response.password = undefined;

    return {message: "User created", user: response} 
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

  if(!data)
    return {message: "User not found"}

  if(updateUserDto.password) 
    updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);

  const response = await this.userRepository.save({
    ...data,
    ...updateUserDto
  });

  response.password = undefined;

  return {message: "User updated", user: response};
  }

  remove(id: string) {
    return {message: "User deleted" ,data: this.userRepository.delete(id)}
  }

  async auth(body: AuthEntity) {
    const {email, password} = body;

    if(!email || !password) 
      return {message: "Please send the email and the password"}; 

    const user = await this.userRepository.findOne({ where: {email}});

    if(!user)
      return {message: "User not found"};

    if(!(await bcrypt.compare(password, user.password))) 
      return {message: "User or password not found"}

    user.password = undefined;

    return {message: "User Logged", token: this.generateToken({id: user.id})};
  }

  generateToken(params = {}) {
    return jwt.sign(params, "7ccd7835da99ef1dbbce76128d3ae0e7", {
      expiresIn: 86400
    })
  }

}