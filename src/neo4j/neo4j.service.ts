import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common';
import { Driver } from 'neo4j-driver';
import { NEO4J_DRIVER } from './neo4j.constants';
import { map } from 'rxjs/operators';
import { callbackFn } from 'src/types';

@Injectable()
export class Neo4jService implements OnApplicationShutdown {
  constructor(@Inject(NEO4J_DRIVER) private readonly driver: Driver) {}

  getDriver(): Driver {
    return this.driver;
  }

  getSession() {
    return this.getDriver().session();
  }

  getRxSession() {
    return this.getDriver().rxSession();
  }

  onApplicationShutdown() {
    this.getDriver()
      .close()
      .then((r) => console.log(`Neo4j connection closed : ${r}`));
  }

  queryWithSessionPromise(query: string, params: any = {}) {
    return this.getSession()
      .run(query, params)
      .then((result) => {
        console.log('result: ', result);
        return result;
      });
  }

  queryWithRxSessionPromise(
    query: string,
    recordProperty = 'c',
    params: any = {},
    callback?: callbackFn | null,
    message?: string,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const result = [];

      const records = map(
        (record: any) => record.get(recordProperty).properties,
      );

      const next = (data: any) => {
        // console.log(`${message}: `, data);
        if (callback) callback(data);
        result.push(data);
      };

      const complete = () => {
        console.log('I am done');
        resolve(result);
      };

      const error = (err: Error) => {
        console.log('error', err);
        reject(err);
      };

      const callbacks = {
        next,
        complete,
        error,
      };

      this.getRxSession()
        .run(query, params)
        .records()
        .pipe(records)
        .subscribe(callbacks);
    });
  }
}
