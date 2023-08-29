import { DynamicModule, Module, Provider } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';
import { ConfigModule } from '@nestjs/config';
import { createDriver } from './neo4j.util';

@Module({})
export class Neo4jModule {
  static forRootAsync(configProvider): DynamicModule {
    return {
      module: Neo4jModule,
      global: true,
      imports: [ConfigModule],

      providers: [
        {
          provide: 'NEO4J_CONFIG',
          ...configProvider,
        } as Provider<any>,
        {
          provide: 'NEO4J_DRIVER',
          inject: ['NEO4J_CONFIG'],
          useFactory: (config) => createDriver(config),
        },
        Neo4jService,
      ],
      exports: [Neo4jService],
    };
  }
}
