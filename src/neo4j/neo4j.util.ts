import neo4j, { Driver } from 'neo4j-driver';

export const createDriver = async (config): Promise<Driver> => {
  const driver: Driver = neo4j.driver(
    config.host,
    neo4j.auth.basic(config.username, config.password),
  );

  await driver.verifyConnectivity();

  return driver;
};
