/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BetOneLeftEntity } from './models/betOnelLeft.entity';
import { BetOneLeft } from './models/betOneLeft.interface';
import { AdminAproveEntity } from './models/adminAprove.entity';
import { RoundEntity } from 'src/rounds/models/round.entity';
import { PaymentEntity } from 'src/payment/models/payment.entity';
import { UserEntity } from 'src/users/models/user.entity';
import { NotificationEntity } from 'src/notifications/models/notifications.entity';
const moment = require('moment');
@Injectable()
export class BetsOneLeftService {
  constructor(
    @InjectRepository(BetOneLeftEntity)
    private readonly betOneLeftRepository: Repository<BetOneLeftEntity>,
    @InjectRepository(RoundEntity)
    private readonly roundsRepository: Repository<RoundEntity>,
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>
  ) {}

  async create(betOneLeft: BetOneLeft) {
    const { userId, matchId, winnerTeamId } = betOneLeft;

    const rounds = await this.roundsRepository.find({ matchId });

    betOneLeft.leagueId = rounds[0].leagueId;

    const payment = await this.paymentRepository.find({
      where: {
        leagueId: rounds[0].leagueId,
        userId,
      },
    });

    // if (payment[0]) {
    // if (payment[0].status === 'aprovado' && payment[0].gameMode === 2 || payment[0].gameMode === 3) {
    const betLeftOneExists = await this.betOneLeftRepository.findOne({
      userId,
      round: betOneLeft.round,
      leagueId: betOneLeft.leagueId
    });

    if (betLeftOneExists) {
      const response = await this.betOneLeftRepository.save({
        ...betLeftOneExists,
        ...betOneLeft,
      });

      return {message: "Aposta atualizada com sucesso", bet: response}
    }      

    const lastBet = await this.betOneLeftRepository.findOne({
      where: { userId },
      order: { createdAt: 'DESC' },
    });

    if (lastBet && lastBet.life === 0)
      return { message: "This user don't have more lifes!" };

    const round = await this.roundsRepository.findOne({ matchId: matchId });

    const betLeftOneTeamExists = await this.betOneLeftRepository.findOne({
      where: { userId, winnerTeamId },
    });

    if (betLeftOneTeamExists)
      return {
        message:
          'Bet already placed on this team, please bet on another team to win',
      };

      betOneLeft.round = rounds[0].round;

    if (moment().utc() > round.dateRoundLocked) {
      return { message: 'Bet round locked' };
    } else {
      if (!lastBet && rounds[0].round >= 7) {

        betOneLeft.life = 2;
        const response = await this.betOneLeftRepository.save(betOneLeft);

        return { message: 'Bet left one created', betLeftOne: response };
      } else {
        const response = await this.betOneLeftRepository.save(betOneLeft);

        return { message: 'Bet left one created', betLeftOne: response };
      }
    }
    // } else if (payment[0].status === 'processando') {
    //   return { message: 'Processing payment!' };
    // } else {
    //   return { message: 'Paymente denied!' };
    // }
    // } else {
    //   return { message: 'Payment not found!' };
    // }
  }

  async adminAprove(body: AdminAproveEntity) {
    const { id } = body;
    let winner = 0;
    const bet = await this.betOneLeftRepository.findOne({ id });
    
    if (!bet) return { message: 'Bet not found!' };

    if (bet.status) return { message: 'Bet has already been updated!' };

    const round = await this.roundsRepository.findOne({ matchId: bet.matchId });
    const betAtt = bet;

    const notification = {
      userId: bet.userId,
      read: 0,
      message: "Jogo finalizado!",
      gameMode: "Resta 1"
    }
    
    await this.notificationRepository.save(notification);

    if (round.awayTeamScore > round.homeTeamScore) {
      winner = round.awayTeamId;
    } else if (round.homeTeamScore > round.awayTeamScore) {
      winner = round.homeTeamId;
    } else {
      winner = 0;
    }

    if (winner !== bet.winnerTeamId) {
      betAtt.life -= 1;
    } else {
      const user = await this.userRepository.findOne({ where: { id: bet.userId}});
      let newPoints = user;
      newPoints.winsNumberLeftOne += 1;

      await this.userRepository.save({
        ...user,
        ...newPoints
      });

      const notification = {
        userId: bet.userId,
        read: 0,
        message: "Parabéns você acertou o vencedor do jogo!",
        gameMode: "Resta 1"
      }
      
      await this.notificationRepository.save(notification);
    }

    betAtt.status = true;
    betAtt.winnerTeamId = winner;

    await this.betOneLeftRepository.save({
      ...bet,
      ...betAtt,
    });

    return { message: 'Bet updated!' };
  }

  findAll() {
    return this.betOneLeftRepository.find();
  }

  findOne(id: string) {
    return this.betOneLeftRepository.findByIds([id]);
  }

  async update(id: string, updateBetOneLeftDto: BetOneLeft) {
    const data = await this.betOneLeftRepository.findOne({ where: { id } });

    if (!data) return { message: 'Bet left one not found' };

    const response = await this.betOneLeftRepository.save({
      ...data,
      ...updateBetOneLeftDto,
    });

    return { message: 'Bet left one updated', betLeftOne: response };
  }

  remove(id: string) {
    return this.betOneLeftRepository.delete(id);
  }

  async getWinningBet(id: string) {
    const response = await this.betOneLeftRepository.find({
      where: { userId: id, status: true },
      order: {
        createdAt: 'ASC',
      },
    });

    return response;
  }

  async getBet(id: string) { 
     const response = await this.betOneLeftRepository
      .createQueryBuilder("betOneLeft")
      .innerJoinAndSelect("team", "team", "team.teamId = betOneLeft.winnerTeamId")
      .select(["team.teamName, betOneLeft.matchId, betOneLeft.life"])
      .orderBy("betOneLeft.id", "DESC")
      .where(`betOneLeft.userId = ${id}`)
      .getRawOne();

    return {message: "Last leftOne user bet!", response: response}
  }
}
