import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import process from 'process';

@Injectable()
export class AppService {
  private configService: ConfigService;
  private readonly logger: Logger = new Logger(AppService.name);
  getHello(): string {
    this.logger.verbose(`ENV: ${process.env.NODE_ENV}`);
    this.logger.verbose(
      `I should have AUTH0 Audience from secret manager: ${this.configService.get<string>(
        'AUTH0_ISSUER_URL',
      )}`,
    );
    this.logger.log('Hello World!');
    return 'Hello World!';
  }
}
