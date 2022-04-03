/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamEntity } from './models/team.entity';
import { Team } from './models/team.interface';
const axios = require('axios');
@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(TeamEntity)
    private readonly teamRepository: Repository<TeamEntity>,
  ) {}

  async create(league: number, team: Team) {
    const token = process.env.TOKEN_API;

    const leagueId = league;

    try {
      const response = await axios.get(
        `https://api.football-data.org/v2/competitions/${leagueId}/teams`,
        {
          headers: {
            'X-Auth-Token': token,
          },
        },
      );

      response.data.teams.forEach(async (element) => {
        const teamExists = await this.teamRepository.findOne({
          where: { teamId: element.id },
        });

        if (teamExists) {
          return { message: 'Team already exists' };
        } else {
          const data = {
            leagueId: response.data.competition.id,
            teamId: element.id,
            teamName: element.name,
            teamEmblemUrl: element.crestUrl ? element.crestUrl : null,
          };

          this.teamRepository.save(data);
          return { message: 'Data of teams inserted in the tables' };
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return this.teamRepository.find({
      order: {
        teamName: 'ASC',
      },
    });
  }

  findOne(id: string) {
    return this.teamRepository.findByIds([id]);
  }

  async update(leagueId: number, updateTeamDto: Team) {
    const token = process.env.TOKEN_API;

    try {
      const response = await axios.get(
        `https://api.football-data.org/v2/competitions/${leagueId}/teams`,
        {
          headers: {
            'X-Auth-Token': token,
          },
        },
      );
      response.data.teams.forEach(async (element) => {
        const dataDB = await this.teamRepository.findOne({
          where: { teamId: element.id },
        });

        if (!dataDB) {
          return { message: 'Team not found' };
        } else {
          const data = {
            leagueId: response.data.competition.id,
            teamId: element.id,
            teamName: element.name,
            teamEmblemUrl: element.crestUrl ? element.crestUrl : null,
          };

          const responseDB = await this.teamRepository.save({
            ...dataDB,
            ...data,
          });
        }
      });
      return { message: 'Teams updated' };
    } catch (error) {
      console.log(error);
    }
  }

  remove(id: string) {
    return this.teamRepository.delete(id);
  }
}
