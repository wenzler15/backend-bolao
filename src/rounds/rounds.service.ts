import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoundDto } from './dto/create-round.dto';
import { UpdateRoundDto } from './dto/update-round.dto';
import { Round, RoundDocument } from './entities/round.entity';

@Injectable()
export class RoundsService {
  constructor(
    @InjectModel(Round.name) private roundModel: Model<RoundDocument>,
  ) {}

  create(createRoundDto: CreateRoundDto) {
    const round = new this.roundModel(createRoundDto);
    return round.save();
  }

  findAll() {
    return this.roundModel.find();
  }

  findOne(id: string) {
    return this.roundModel.findById(id);
  }

  update(id: string, updateRoundDto: UpdateRoundDto) {
    return this.roundModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: UpdateRoundDto,
      },
      {
        new: true,
      },
    );
  }

  remove(id: string) {
    return this.roundModel
      .deleteOne({
        _id: id,
      })
      .exec();
  }
}
