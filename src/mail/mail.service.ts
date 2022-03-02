import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendForgotPassword(email: string, token: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Esqueci minha senha',
      template: './templates/forgot_password', 
      context: { token },
    });
  }
}