const databaseConfig = {
  dbhost: process.env.NODE_ENV === 'test' ? process.env.MONGO_URL : process.env.DB_HOST,
}

const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expiration: parseInt(process.env.JWT_EXPIRATION, 10),
}

export { databaseConfig, jwtConfig }
