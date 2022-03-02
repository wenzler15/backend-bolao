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

  async create(round: Round) {
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
      response.data.matches.forEach((element) => {
        const data = {
          leagueId: response.data.competition.id,
          round: element.matchday,
          homeTeamId: element.homeTeam.id,
          homeTeamScore: element.score.fullTime.homeTeam,
          awayTeamId: element.awayTeam.id,
          awayTeamScore: element.score.fullTime.awayTeam,
          dateRound: element.utcDate,
          status: element.status,
        };

        this.roundRepository.save(data);
      });
    } catch (error) {
      console.log(error);
    }

    return { message: 'Rounds table updated!' };
  }

  findAll() {
    return this.roundRepository.find();
  }

  findOne(id: string) {
    return this.roundRepository.findByIds([id]);
  }

  update(id: string, updateRoundDto: string) {
    // return this.roundModel
    //   .findByIdAndUpdate(
    //     {
    //       _id: id,
    //     },
    //     {
    //       $set: updateRoundDto,
    //     },
    //     {
    //       new: true,
    //     },
    //   )
    //   .exec();
  }

  remove(id: string) {
    return this.roundRepository.delete(id);
  }
}
