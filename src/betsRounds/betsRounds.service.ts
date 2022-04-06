/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationEntity } from 'src/notifications/models/notifications.entity';
import { PaymentEntity } from 'src/payment/models/payment.entity';
import { RoundEntity } from 'src/rounds/models/round.entity';
import { UserEntity } from 'src/users/models/user.entity';
import { Repository } from 'typeorm';
import { AdminAproveEntity } from './models/adminAprove.entity';
import { BetRoundEntity } from './models/betRounds.entity';
import { BetRound } from './models/betRounds.interface';
const moment = require('moment');
@Injectable()
export class BetsRoundsService {
  constructor(
    @InjectRepository(BetRoundEntity)
    private readonly betRoundRepository: Repository<BetRoundEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RoundEntity)
    private readonly roundRepository: Repository<RoundEntity>,
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>,
  ) {}

  async create(betRound: BetRound) {
    const { userId, matchId } = betRound;

    const rounds = await this.roundRepository.find({ matchId });

    const payment = await this.paymentRepository.findOne({
      where: {
        leagueId: rounds[0].leagueId,
        userId,
      },
    });

    const firstBet = await this.betRoundRepository.findOne({ userId });

    // if (payment[0] || !firstBet) {
    // if (payment[0] && payment[0].status === 'aprovado' && payment[0].gameMode === 1 || payment[0].gameMode === 3 || !firstBet) {
    const betExits = await this.betRoundRepository.findOne({
      userId,
      matchId,
    });

    if (betExits) return { message: 'User had already betted in this match!' };

    const round = await this.roundRepository.findOne({ matchId: matchId });

    if (moment().utc() > round.dateRoundLocked) {
      return { message: 'Bet round locked' };
    } else {
      const response = await this.betRoundRepository.save(betRound);

      return { message: 'Bet round created', betRound: response };
    }
    // } else if (payment[0].status === 'processando') {
    //   return { message: 'Processing payment!' };
    // } else {
    return { message: 'Paymente denied!' };
  }
  // } else {
  //   return { message: 'Payment not found!' };
  // }

  async adminAprove(body: AdminAproveEntity) {
    const { id } = body;
    let winner = 0;

    const bet = await this.betRoundRepository.findOne({ where: { id } });

    if (bet.status) return { message: 'This bet has already been updated!' };

    const user = await this.userRepository.findOne({ id: bet.userId });

    const notification = {
      userId: bet.userId,
      read: 0,
      message: 'Jogo finalizado!',
      gameMode: 'Semanal',
    };

    await this.notificationRepository.save(notification);

    const round = await this.roundRepository.findOne({ matchId: bet.matchId });

    let updateUser = user;
    let points = user.points;

    if (round.awayTeamScore > round.homeTeamScore) {
      winner = round.awayTeamId;
    } else if (round.homeTeamScore > round.awayTeamScore) {
      winner = round.homeTeamId;
    } else {
      winner = 0;
    }

    if (
      bet.awayTeamScore === round.awayTeamScore &&
      bet.homeTeamScore === round.homeTeamScore &&
      winner != 0
    ) {
      if (round.awayTeamId === user.favoriteTeam) {
        points += 100;
      } else {
        points += 80;
      }
      updateUser.winsNumber += 1;

      const notificationWinner = {
        userId: bet.userId,
        read: 0,
        message: 'Parabéns, você acertou o placar do jogo!',
      };

      await this.notificationRepository.save(notificationWinner);
    } else if (bet.winnerTeam === 0 && winner === 0) {
      points += 40;
    } else if (bet.winnerTeam == winner) {
      points += 60;

      const notificationWinner = {
        userId: bet.userId,
        read: 0,
        message: 'Você acertou o vencedor!',
      };

      await this.notificationRepository.save(notificationWinner);
    }

    if (
      bet.winnerTeam === user.favoriteTeam ||
      (bet.winnerTeam === 0 && round.awayTeamId === user.favoriteTeam) ||
      round.homeTeamId === user.favoriteTeam
    ) {
      points *= 2;
    }

    updateUser.points = points;

    await this.userRepository.save({
      ...user,
      ...updateUser,
    });

    await this.betRoundRepository.save({
      ...bet,
      ...body,
    });

    return { message: 'Bet updated!' };
  }

  async findAll() {
    return this.betRoundRepository.find();
  }

  findOne(id: string) {
    return this.betRoundRepository.findByIds([id]);
  }

  async update(id: string, updateBetroundDto: BetRound) {
    const data = await this.betRoundRepository.findOne({ where: { id } });

    if (!data) return { message: 'Bet round not found' };

    const response = await this.betRoundRepository.save({
      ...data,
      ...updateBetroundDto,
    });

    return { message: 'Bet round updated', betRound: response };
  }

  remove(id: string) {
    return this.betRoundRepository.delete(id);
  }

  async getAllWinningBet() {
    const response = await this.betRoundRepository
      .createQueryBuilder('betRound')
      .innerJoinAndSelect('user', 'user', 'user.id = betRound.userId')
      .innerJoinAndSelect('round', 'round', 'betRound.matchId = round.matchId')
      .innerJoinAndSelect(
        'team',
        'teamHome',
        'teamHome.teamId = round.homeTeamId',
      )
      .innerJoinAndSelect(
        'team',
        'teamAway',
        'teamAway.teamId = round.awayTeamId',
      )
      .innerJoinAndSelect(
        'team',
        'teamWinner',
        'teamWinner.teamId = betRound.winnerTeam',
      )
      .select([
        'betRound.userId, user.name, user.lastName, betRound.id, teamHome.teamName AS "TimeDaCasa", teamAway.teamName AS "TimeVisitante", teamWinner.teamName AS "TimeVencedor"',
      ])
      .where('betRound.status = true')
      .orderBy('betRound.createdAt', 'ASC')
      .getRawMany();
    return response;
  }

  async getWinningBet(id: string) {
    const response = await this.betRoundRepository.find({
      where: { userId: id, status: true },
      order: {
        createdAt: 'ASC',
      },
    });

    return response;
  }

  async getBet(id: string) {
    const response = await this.betRoundRepository
      .createQueryBuilder('betRound')
      .innerJoinAndSelect('team', 'team', 'team.teamId = betRound.winnerTeam')
      .innerJoinAndSelect('round', 'round', 'round.matchId = betRound.matchId')
      .innerJoinAndSelect('team', 'team2', 'team2.teamId = round.homeTeamId')
      .innerJoinAndSelect('team', 'team3', 'team3.teamId = round.awayTeamId')
      .select([
        'team.teamName, betRound.matchId, betRound.homeTeamScore, betRound.awayTeamScore, team2.teamName AS "TimeDaCasa", team3.teamName AS "TimeVisitante"',
      ])
      .orderBy('betRound.id', 'DESC')
      .where(`betRound.userId = ${id}`)
      .getRawOne();
    return { message: 'Last leftOne user bet!', response: response };
  }
}
