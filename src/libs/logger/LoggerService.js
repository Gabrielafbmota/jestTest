const { createLogger, format, transports } = require('winston')

class LoggerService {
  constructor(configs, context) {
    this.appName = context || ''
    this.templateLoggers = {
      console: params => this.createConsoleLogger(params),
      file: params => this.createFileLogger(params),
    }
    this.tabText = process.env.NODE_ENV === 'development' ? 2 : 0
    const { timestamp, label, ms } = format

    this.logger = createLogger({
      format: format.combine(
        label({ label: this.appName ? this.appName : null }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
        ms(),
        format.colorize(),
      ),
      transports: configs.map(item => this.templateLoggers[item.type](item)),
    })
  }

  createConsoleLogger(config) {
    return new transports.Console({
      level: config.level,
      format: format.printf(msg => {
        const { level, message, label, timestamp, ms } = msg

        return msg.obj
          ? `${timestamp} ${ms} ${level}${label ? ` [${label}]` : ''}: ${message}\n${JSON.stringify(
            msg.obj,
            null,
            this.tabText,
          )}`
          : `${timestamp} ${ms} ${level}${label ? ` [${label}]` : ''}: ${message}`
      }),
    })
  }

  createFileLogger(config) {
    return new transports.File({
      level: config.level,
      filename: config.filename,
      format: format.printf(msg => {
        const { level, message, label, timestamp, ms } = msg
        const ts = new Date(timestamp).toUTCString()
        return msg.obj
          ? `${ts} ${ms} ${label ? `[${label}]` : ''} ${level}: ${message} ${JSON.stringify(
            msg.obj,
          )}`
          : `${ts} ${ms} ${label ? `[${label}]` : ''} ${level}: ${message}`
      }),
    })
  }

  get level() {
    return ['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly']
  }

  async error(message, obj) {
    this.logger.log('error', { message, obj })
  }

  async warn(message, obj) {
    this.logger.log('warn', { message, obj })
  }

  async info(message, obj) {
    this.logger.log('info', { message, obj })
  }

  async http(message, obj) {
    this.logger.log('http', { message, obj })
  }

  async verbose(message, obj) {
    this.logger.log('verbose', { message, obj })
  }

  async debug(message, obj) {
    this.logger.log('debug', { message, obj })
  }

  async silly(message, obj) {
    this.logger.log('silly', { message, obj })
  }
}

function configServiceLogger(level, appName) {
  return new LoggerService(level, appName)
}

function createRouterLogger() {
  const logger = new LoggerService([{ type: 'console', level: 'silly' }])
  function requestLogger(req, res, next) {
    logger.info(`>>> ${req.method} [ ${req.url} ]`)
    return next()
  }
  function responseLogger(req, res, next) {
    let level = 'info'
    if (res.statusCode >= 400 && res.statusCode < 500) {
      level = 'warn'
    }

    if (res.statusCode > 500) level = 'error'

    logger[level](`<<< ${req.method} [ ${res.statusCode} ${res.statusMessage} ]`)
    return next()
  }
  return { requestLogger, responseLogger }
}

module.exports = LoggerService
module.exports.configServiceLogger = configServiceLogger
module.exports.createRouterLogger = createRouterLogger
