import mongoose from 'mongoose'

import { databaseConfig } from '../config'
import { createLogger } from '../libs/logger'

const logger = createLogger('repositories.mongo_connection')

function getConfig() {
  return process.env.NODE_ENV === 'test'
    ? {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    : {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
}

export default async function databaseConnection() {
  try {
    const conn = mongoose
      .connect(databaseConfig.dbhost, getConfig())
      .catch((err) => logger.error(err))
    logger.info(`Connect database ${databaseConfig.dbhost}`)
    return conn
  } catch (error) {
    logger.error(`Error connect database ${error.message}`, error.message)
    return error
  }
}
