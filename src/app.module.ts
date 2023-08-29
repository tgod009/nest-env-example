import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as process from 'process';
import { Neo4jModule } from './neo4j/neo4j.module';
import { ManagementModule } from '@twirelab/nestjs-auth0';

console.log(`${process.cwd()}/config/env/${process.env.NODE_ENV}.env`);
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      envFilePath: `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`,
    }),
    Neo4jModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        host: configService.get('DATABASE_HOST'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
      }),
    }),
    ManagementModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        domain: configService.get('AUTH0_MANAGEMENT_API_URL'),
        clientId: configService.get('AUTH0_MANAGEMENT_API_CLIENT_ID'),
        clientSecret: configService.get('AUTH0_MANAGEMENT_API_CLIENT_SECRET'),
        audience: configService.get('AUTH0_MANAGEMENT_API_AUDIENCE'),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
