import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationEntity } from './models/notifications.entity';

@Injectable()
export class NotificationsService {
  constructor( 
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>
    ) {}
  create(createNotificationDto: any) {
    return 'This action adds a new notification';
  }

  findAll() {
    return `This action returns all notifications`;
  }

  async findOne(id: string) {
    const response = await this.notificationRepository.find({ where: { userId: id}})
    return response;
  }

  update(id: string, updateNotificationDto: any) {
    return `This action updates a #${id} notification`;
  }

  remove(id: string) {
    return `This action removes a #${id} notification`;
  }
}
