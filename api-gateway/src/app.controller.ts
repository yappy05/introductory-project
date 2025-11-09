import {
  Controller,
  Get,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Post('transcribe-process')
  @UseInterceptors(FileInterceptor('file'))
  public transcribe(@UploadedFile() file: Express.Multer.File) {
    this.client.emit('transcribe-process', { file });
    return { status: 'Transcription process started' };
  }
}
