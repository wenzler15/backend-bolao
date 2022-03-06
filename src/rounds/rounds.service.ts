/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoundEntity } from './models/round.entity';
import { Round } from './models/round.interface';
const axios = require('axios');
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
            dateRound: element.utcDate,
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

  findAll() {
    return this.roundRepository.find({
      order: {
        round: 'ASC',
        dateRound: 'ASC',
      },
    });
  }

  findOne(id: string) {
    return this.roundRepository.findByIds([id]);
  }

  async update(updateRoundDto: Round) {
    const token = process.env.TOKEN_API;

    //Id referente ao Brasileirão
    const leagueId = 2013;

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
            dateRound: element.utcDate,
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
