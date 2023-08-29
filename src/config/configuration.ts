export default () => ({
  port: parseInt(process.env.PORT) || 8090,
  neo4j: {
    scheme: process.env.DATABASE_SCHEME,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  },
  auth0: {
    domain: process.env.AUTH0_MANAGEMENT_API_URL,
    clientId: process.env.AUTH0_MANAGEMENT_API_CLIENT_ID,
    clientSecret: process.env.AUTH0_MANAGEMENT_API_CLIENT_SECRET,
    audience: process.env.AUTH0_MANAGEMENT_API_AUDIENCE,
  },
});
