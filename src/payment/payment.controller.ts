import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  create(@Body() createPaymentDto: any) {
    return this.paymentService.create(createPaymentDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: any) {
    return this.paymentService.update(+id, updatePaymentDto);
  }
}
