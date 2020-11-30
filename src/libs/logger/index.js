import LoggerService, { createRouterLogger } from './LoggerService'

const level = process.env.LOG_LEVEL || 'silly'

const loggerConfig = [{ type: 'console', level }]

const logger = new LoggerService(loggerConfig, null)

const { responseLogger, requestLogger } = createRouterLogger()

export function createLogger(context) {
  return new LoggerService(loggerConfig, context)
}

export default logger
export { requestLogger, responseLogger }
