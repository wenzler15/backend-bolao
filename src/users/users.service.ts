import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { Repository } from 'typeorm';
import { UserEntity } from './models/user.entity';
import { User } from './models/user.interface';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>) {}

  create(user: User): Observable<User> {
    return from(this.userRepository.save(user));
  }

  findAll() {
    // return this.userModel.find();
  }

  findOne(id: string) {
    // return this.userModel.findById(id);
  }

  update(id: string, updateUserDto: string) {
    // return this.userModel
    //   .findByIdAndUpdate(
    //     {
    //       _id: id,
    //     },
    //     {
    //       $set: updateUserDto,
    //     },
    //     {
    //       new: true,
    //     },
    //   )
    //   .exec();
  }

  remove(id: string) {
  //   return this.userModel
  //     .deleteOne({
  //       _id: id,
  //     })
  //     .exec();
  // }
  }

}