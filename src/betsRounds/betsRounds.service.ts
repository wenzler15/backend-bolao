/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoundEntity } from 'src/rounds/models/round.entity';
import { UserEntity } from 'src/users/models/user.entity';
import { Repository } from 'typeorm';
import { AdminAproveEntity } from './models/adminAprove.entity';
import { BetRoundEntity } from './models/betRounds.entity';
import { BetRound } from './models/betRounds.interface';
@Injectable()
export class BetsRoundsService {
  constructor(
    @InjectRepository(BetRoundEntity)
    private readonly betRoundRepository: Repository<BetRoundEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RoundEntity)
    private readonly roundRepository: Repository<RoundEntity>,
  ) {}

  async create(betRound: BetRound) {
    const { userId, matchId } = betRound;

    const betExits = await this.betRoundRepository.findOne({ userId, matchId });

    if (betExits) return { message: 'User had already betted in this match!' };

    const response = await this.betRoundRepository.save(betRound);

    return { message: 'Bet round created', betRound: response };
  }

  async adminAprove(body: AdminAproveEntity) {
    const { id } = body;
    let winner = 0;

    const bet = await this.betRoundRepository.findOne({ where: { id } });

    if (bet.status) return { message: 'This bet has already been updated!' };

    const user = await this.userRepository.findOne({ id: bet.userId });

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
      points += 100;
    } else if (bet.winnerTeam === 0 && winner === 0) {
      points += 60;
    } else if (bet.winnerTeam == winner) {
      points += 80;
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

  findAll() {
    return this.betRoundRepository.find();
  }

  findOne(id: string) {
    return this.betRoundRepository.findByIds([id]);
  }

  async update(id: string, updateBetroundDto: BetRound) {
    const data = await this.betRoundRepository.findOne({ where: { id } });

    if (!data) return { message: 'Bet left one not found' };

    const response = await this.betRoundRepository.save({
      ...data,
      ...updateBetroundDto,
    });

    return { message: 'Bet round updated', betRound: response };
  }

  remove(id: string) {
    return this.betRoundRepository.delete(id);
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
}
