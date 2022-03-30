import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/models/user.entity';
import { Repository } from 'typeorm';
import { PaymentEntity } from './models/payment.entity';
@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
  ) {}

  async create(createPaymentDto: any) {
    const id = createPaymentDto.userId;

    const userExists = await this.usersRepository.findOne({ where: {id}}); 

    if(!userExists) 
      return {message: "User not found!"}

    const mercadopago = require ('mercadopago');

    mercadopago.configure({
      access_token: process.env.ACCESS_TOKEN
    });

    let preference = {
      items: [
        {
          title: createPaymentDto.title,
          unit_price: createPaymentDto.price,
          quantity: 1,
        }
      ]
    };

    let URL = "";

    await mercadopago.preferences.create(preference)
    .then(function(response){
      URL = response.body.init_point;
    }).catch(function(error){
      console.log(error);
    });

    createPaymentDto.status = "Processando pagamento";

    const response = await this.paymentRepository.save(createPaymentDto);

    return {message: "Payment created!", payment_url: URL, data: response};
  }

  async update(id: number, updatePaymentDto: any) {
    const data = await this.paymentRepository.findOne({id});

    if(!data) 
      return {message: "Payment not found!"}

    await this.paymentRepository.save({
      ...data,
      ...updatePaymentDto
    });

    return {message: "Payment updated!"}
  }
}
