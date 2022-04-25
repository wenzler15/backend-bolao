/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { SendGridService } from '@anchan828/nest-sendgrid';
import { Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { response } from 'express';
import { BetOneLeftEntity } from 'src/betsOneLeft/models/betOnelLeft.entity';
import { BetRoundEntity } from 'src/betsRounds/models/betRounds.entity';
import { PaymentEntity } from 'src/payment/models/payment.entity';
import { PremiumEntity } from 'src/premium/models/premium.entity';
import { RoundEntity } from 'src/rounds/models/round.entity';
import { TeamEntity } from 'src/teams/models/team.entity';
import { Repository } from 'typeorm';
import { AuthEntity } from './models/auth.entity';
import { ResetPasswordEntity } from './models/resetPassword.entity';
import { UserEntity } from './models/user.entity';
import { User } from './models/user.interface';
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require('axios')
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
    @InjectRepository(BetOneLeftEntity)
    private readonly betOneLeftRepository: Repository<BetOneLeftEntity>,
    @InjectRepository(BetRoundEntity)
    private readonly betRoundRepository: Repository<BetOneLeftEntity>,
    @InjectRepository(PremiumEntity)
    private readonly premiumRepository: Repository<PremiumEntity>,
    @InjectRepository(RoundEntity)
    private readonly roundRepository: Repository<RoundEntity>,
    @InjectRepository(TeamEntity)
    private readonly teamRepository: Repository<TeamEntity>,
    private readonly sendGird: SendGridService) {}

  async create(user: User) {
    const {email, name, lastName} = user;

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

    const team = await this.teamRepository.findOne({
      where: { teamId: user.favoriteTeam },
    });

    team.id = undefined;
    team.leagueId = undefined;
    team.createdAt = undefined;
    user.favoriteTeam = undefined;

    if(!user)
      return {message: "User not found"};

    if(!(await bcrypt.compare(password, user.password))) 
      return {message: "User or password not found"}

    user.password = undefined;

    return {
      message: "User Logged", 
      token: this.generateToken({id: user.id}),
      user: user,
      team: team
    };
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

  async checkPayment(body: any) {
    const {userId, leagueId} = body;
    if(body.gameMode === 1) {
      const status = await this.paymentRepository.findOne({ userId, leagueId });

      if(!status) 
        return {message: 'Payment not found!'}

      return {message: status.status};
    } else {
      const status = await this.paymentRepository.findOne({ userId, leagueId, round: body.round });

      if(!status) 
        return {message: 'Payment not found!'}

      return {message: status.status};
    }
  }

  async loginSocial(body: any) {
    const email = body.email;
    const user = await this.userRepository.findOne({ where: {email}});
    if(body.facebook_token) {
      if(body.facebook_token === user.facebookToken) {
        return {
          message: "Correct token!",
          user: user
        }
      }
      return {message: "Incorrect token!"}
    } else {
      if(body.google_token === user.googleToken) {
        return {
          message: "Correct token!",
          user: user
        }
      }
      return {message: "Incorrect token!"}
    } 
  }

  async historyBets(id: string) {
    const betsLeftOne = await this.betOneLeftRepository
    .createQueryBuilder('betOneLeft')
    .leftJoinAndSelect('team', 'winnerTeam', 'winnerTeam.teamId = betOneLeft.winnerTeamId')
    .innerJoinAndSelect('round', 'round', 'round.matchId = betOneLeft.matchId')
    .innerJoinAndSelect(
      'team',
      'homeTeam',
      'homeTeam.teamId = round.homeTeamId',
    )
    .innerJoinAndSelect(
      'team',
      'awayTeam',
      'awayTeam.teamId = round.awayTeamId',
    )
    .select(['betOneLeft.userId, betOneLeft.life, betOneLeft.matchId, betOneLeft.round, betOneLeft.leagueId, betOneLeft.status , awayTeam.teamEmblemUrl AS "awayTeamEmblemUrl", awayTeam.teamName AS "awayTeamName", homeTeam.teamEmblemUrl AS "homeTeamEmblemUrl", homeTeam.teamName AS "homeTeamName", winnerTeam.teamName as "winnerTeam"'])
    .orderBy('betOneLeft.createdAt', 'DESC')
    .where(`betOneLeft.userId = ${id}`)
    .getRawMany();

    const betsRound = await this.betRoundRepository
    .createQueryBuilder('betRound')
    .innerJoinAndSelect('team', 'winnerTeam', 'winnerTeam.teamId = betRound.winnerTeam')
    .innerJoinAndSelect('round', 'round', 'round.matchId = betRound.matchId')
    .innerJoinAndSelect(
      'team',
      'homeTeam',
      'homeTeam.teamId = round.homeTeamId',
    )
    .innerJoinAndSelect(
      'team',
      'awayTeam',
      'awayTeam.teamId = round.awayTeamId',
    )
    .select(['betRound.userId, betRound.matchId, betRound.round, betRound.homeTeamScore, betRound.awayTeamScore , awayTeam.teamEmblemUrl AS "awayTeamEmblemUrl", awayTeam.teamName AS "awayTeamName", homeTeam.teamEmblemUrl AS "homeTeamEmblemUrl", homeTeam.teamName AS "homeTeamName", winnerTeam.teamName as "winnerTeam"'])
    .orderBy('betRound.createdAt', 'DESC')
    .where(`betRound.userId = ${id}`)
    .getRawMany();

    const user = await this.userRepository.find({ 
      where: { id: id },
    })

    user[0].password = undefined;
    user[0].passwordResetExpires = undefined;
    user[0].passwordResetToken = undefined;

    return {
      user: user,
      betsLeftOne: betsLeftOne,
      betsRound: betsRound
    };
  }

  async getRanking(id: number, league: number, round: number) {
    let response = [];

    if (round) {
      const premium = await this.premiumRepository.findOne({
        where: {
          leagueId: league,
          round,
          gameMode: 'semanal'
        }
      });

      const premiums = {
        firstPlacePremium: premium ? premium.firstPlacePremium : '',
        secondPlacePremium: premium ? premium.secondPlacePremium : '',
        thirdPlacePremium: premium ? premium.thirdPlacePremium : ''
      }      

      response = await this.userRepository.find({
        select: ["name", "favoriteTeam", "points", "id"],
        order: {
          points: "DESC"
        }
      });

    let userRanking = [];

    response.forEach((item, index) => {     
        if(item.id == id) {
          userRanking.push(item);
        }
      
      item.position = index + 1;
    })

    const respUser = {
      userRanking, 
      generalRanking: response,
      premium: premiums
    }

    return respUser;
    } else {
      const premium = await this.premiumRepository.findOne({
        where: {
          leagueId: league,
          gameMode: 'resta 1'
        }
      });

      const premiums = {
        firstPlacePremium: premium ? premium.firstPlacePremium : '',
        secondPlacePremium: premium ? premium.secondPlacePremium : '',
        thirdPlacePremium: premium ? premium.thirdPlacePremium : ''
      }  

      response = await this.betOneLeftRepository
      .createQueryBuilder("betLeftOne")
      .innerJoinAndSelect("user", "user", 'user.id = betLeftOne.userId')
      .innerJoinAndSelect("round", 'round', 'round.matchId = betLeftOne.matchId')
      .select(["betLeftOne.userId, betLeftOne.life, betLeftOne.matchId, user.name, user.favoriteTeam, round.leagueId"])
      // .groupBy("betLeftOne.userId")
      .orderBy("betLeftOne.life", "DESC")
      .getRawMany();
      
      let userRanking = [];
      let generalRanking = [];

      response.forEach( async (item, index) => {        
        if(item.leagueId == league) {
          if(item.userId == id) {
            userRanking.push(item);
          }
          
          item.position = index + 1;
          generalRanking.push(item);
        }
      })
  
  
      const respUser = {
        userRanking, 
        generalRanking: generalRanking,
        premium: premiums
      }
  
      return respUser;
     } 
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