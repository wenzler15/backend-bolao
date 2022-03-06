/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { SendGridService } from '@anchan828/nest-sendgrid';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthEntity } from './models/auth.entity';
import { ResetPasswordEntity } from './models/resetPassword.entity';
import { UserEntity } from './models/user.entity';
import { User } from './models/user.interface';
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly sendGird: SendGridService) {}

  async create(user: User) {
    const email = user.email;

    const userExists = await this.userRepository.findOne({ where: {email}}); 

    if(userExists) 
      return {message: "User already exists"}

    const response = await this.userRepository.save(user);
    
    response.password = undefined;
    response.passwordResetExpires = undefined;
    response.passwordResetToken = undefined;

    return {message: "User created", user: response} 
  }

  async findAll() {
    const response = await this.userRepository.find();

    response.forEach((item) => {
      item.password = undefined;
      item.passwordResetExpires = undefined;
      item.passwordResetToken = undefined;
    })

    return response;
  }

  async findOne(id: string) {
    const response = await this.userRepository.findByIds([id]);

    response[0].password = undefined;
    response[0].passwordResetExpires = undefined;
    response[0].passwordResetToken = undefined;

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
  response.passwordResetExpires = undefined;
  response.passwordResetToken = undefined;

  return {message: "User updated", user: response}
  }

  remove(id: string) {
    return {message: "User deleted" , data: this.userRepository.delete(id)}
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

  async forgotPassword(email: string) {
    if(!email)
      return {message: "Please send a e-mail"}

    const user = await this.userRepository.findOne({ where: {email}});

    if(!user)
      return {message: "User not found"};
    
    const token = crypto.randomBytes(3).toString("hex");
    
    const now = new Date();
    now.setHours(now.getHours() + 1);

    await this.userRepository.findOne({where: {email}});

    const newInfos = user;

    newInfos.passwordResetToken = token;
    newInfos.passwordResetExpires = now;

    await this.userRepository.save({
      ...user,
      ...newInfos
    });

    await this.sendGird.send({
      to: email,
      from: process.env.SEND_GRID_FROM,
      subject: "Esqueci minha senha",
      text: "Parece que você esqueceu sua senha",
      html: `<p>Esqueceu sua senha? Não tem problema, use esse token para redefinir sua senha: ${token} <p>`
    });

    return  {message: "Token sent"}
  }

  async getRanking() {
    const response = await this.userRepository.find({
      select: ["name", "favoriteTeam", "points"],
      order: {
        points: "DESC"
      }
    });

    response.forEach((item) => {
      item.password = undefined;
      item.passwordResetExpires = undefined;
      item.passwordResetToken = undefined;
    })

    return response;
  }

  async resetPassword(body: ResetPasswordEntity) {
    const {email, token, password} = body;

    if(!email || !token || !password) 
      return {message: "Please send all params (email, token e password)"}

    const user = await this.userRepository.findOne({where: {email}});

    if(!user)
      return {message: "User not found"}
    
    if(token !== user.passwordResetToken)
      return {message: "Wrong token"}

    const now = new Date();

    if (now > user.passwordResetExpires)
      return {message: "Expired token, create a new one"}

    const newData = user;
    newData.password = await bcrypt.hash(password, 10);

    await this.userRepository.save({
      ...user,
      ...newData
    });

    return {message: "Password updated!"}
  }
  
  generateToken(params = {}) {
    return jwt.sign(params, "7ccd7835da99ef1dbbce76128d3ae0e7", {
      expiresIn: 86400
    })
  }

}