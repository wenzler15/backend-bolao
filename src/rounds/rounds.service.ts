/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoundEntity } from './models/round.entity';
import { Round } from './models/round.interface';
const axios = require('axios');
const moment = require('moment');
@Injectable()
export class RoundsService {
  constructor(
    @InjectRepository(RoundEntity)
    private readonly roundRepository: Repository<RoundEntity>,
  ) {}

  async create(league: number, round: Round) {
    const token = process.env.TOKEN_API;

    const leagueId = league;

    try {
      const response = await axios.get(
        `https://api.football-data.org/v2/competitions/${leagueId}/matches`,
        {
          headers: {
            'X-Auth-Token': token,
          },
        },
      );

      response.data.matches.forEach(async (element) => {
        const roundExists = await this.roundRepository.findOne({
          where: { matchId: element.id },
        });

        if (roundExists) {
          return { message: 'Match already exists' };
        } else {
          const data = {
            leagueId: response.data.competition.id,
            matchId: element.id,
            round: element.matchday,
            homeTeamId: element.homeTeam.id,
            homeTeamScore: element.score.fullTime.homeTeam,
            awayTeamId: element.awayTeam.id,
            awayTeamScore: element.score.fullTime.awayTeam,
            dateRound: moment.utc(element.utcDate),
            dateRoundLocked: moment
              .parseZone(element.utcDate)
              .subtract(15, 'minutes'),
            status: element.status,
          };

          this.roundRepository.save(data);
        }
      });
    } catch (error) {
      console.log(error);
    }
    return { message: 'Data of the rounds inserted in the tables' };
  }

  async findAll() {
    let firstDate = moment(new Date()),
      currentDate = moment().format('dddd'),
      difference = 0;

    switch (currentDate) {
      case 'Sunday':
        difference = 7;
        break;
      case 'Monday':
        difference = 6;
        break;
      case 'Tuesday':
        difference = 5;
        break;
      case 'Wednesday':
        difference = 4;
        break;
      case 'Thursday':
        difference = 3;
        break;
      case 'Friday':
        difference = 2;
        break;
      case 'Saturday':
        difference = 1;
        break;
    }

    const rounds = await this.roundRepository.find({
      order: {
        round: 'ASC',
        dateRound: 'ASC',
      },
    });

    const response = [];

    rounds.forEach((item) => {
      const secondDate = item.dateRound;
      const timeDifference = moment.duration(firstDate.diff(secondDate));

      if (Math.abs(Math.floor(timeDifference.asDays())) <= difference) {
        response.push(item);
      }
    });

    return response;
  }

  async findAllBet(id: string) {
    const rounds = await this.roundRepository.find({
      where: {
        round: id,
      },
      order: {
        round: 'ASC',
        dateRound: 'ASC',
      },
    });

    return rounds;
  }

  findOne(id: string) {
    return this.roundRepository.findByIds([id]);
  }

  async update(leagueId: number, updateRoundDto: Round) {
    const token = process.env.TOKEN_API;

    try {
      const response = await axios.get(
        `https://api.football-data.org/v2/competitions/${leagueId}/matches`,
        {
          headers: {
            'X-Auth-Token': token,
          },
        },
      );
      response.data.matches.forEach(async (element) => {
        const dataDB = await this.roundRepository.findOne({
          where: { matchId: element.id },
        });

        if (!dataDB) {
          return { message: 'Match not found' };
        } else {
          const data = {
            leagueId: response.data.competition.id,
            matchId: element.id,
            round: element.matchday,
            homeTeamId: element.homeTeam.id,
            homeTeamScore: element.score.fullTime.homeTeam,
            awayTeamId: element.awayTeam.id,
            awayTeamScore: element.score.fullTime.awayTeam,
            dateRound: moment.utc(element.utcDate),
            dateRoundLocked: moment
              .parseZone(element.utcDate)
              .subtract(15, 'minutes'),
            status: element.status,
          };

          const responseDB = await this.roundRepository.save({
            ...dataDB,
            ...data,
          });
        }
      });
      return { message: 'Rounds updated' };
    } catch (error) {
      console.log(error);
    }
  }

  remove(id: string) {
    return this.roundRepository.delete(id);
  }
}
