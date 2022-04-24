/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeagueEntity } from './models/league.entity';
import { League } from './models/league.interface';
const axios = require('axios');
@Injectable()
export class LeaguesService {
  constructor(
    @InjectRepository(LeagueEntity)
    private readonly leagueRepository: Repository<LeagueEntity>,
  ) {}

  async create(league: League) {
    const token = process.env.TOKEN_API;

    try {
      const response = await axios.get(
        `https://api.football-data.org/v2/competitions`,
        {
          headers: {
            'X-Auth-Token': token,
          },
        },
      );

      response.data.competitions.forEach(async (element) => {
        const leagueExists = await this.leagueRepository.findOne({
          where: { leagueId: element.id },
        });

        if (leagueExists) {
          return { message: 'League already exists' };
        } else {
          const data = {
            leagueId: element.id,
            leagueName: element.name,
          };
          this.leagueRepository.save(data);
        }
      });
    } catch (error) {
      console.log(error);
    }
    return { message: 'Data of the leagues inserted in the tables' };
  }

  findAll() {
    return this.leagueRepository.find({
      order: {
        leagueName: 'ASC',
      },
    });
  }

  findOne(id: string) {
    return this.leagueRepository.findByIds([id]);
  }

  async update(leagueRoundDto: League) {
    const token = process.env.TOKEN_API;

    try {
      const response = await axios.get(
        `https://api.football-data.org/v2/competitions`,
        {
          headers: {
            'X-Auth-Token': token,
          },
        },
      );
      response.data.competitions.forEach(async (element) => {
        const dataDB = await this.leagueRepository.findOne({
          where: { matchId: element.id },
        });

        if (!dataDB) {
          return { message: 'Match not found' };
        } else {
          const data = {
            leagueId: element.id,
            leagueName: element.name,
          };

          const responseDB = await this.leagueRepository.save({
            ...dataDB,
            ...data,
          });
        }
      });
      return { message: 'Leagues updated' };
    } catch (error) {
      console.log(error);
    }
  }

  remove(id: string) {
    return this.leagueRepository.delete(id);
  }
}
