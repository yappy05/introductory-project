import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('client') private readonly client: ClientProxy,
  ) {}

  @Get('ping')
  public ping() {
    return firstValueFrom(this.client.send('ping', {}));
  }
}
