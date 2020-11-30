import express from 'express'

import { createLogger } from './libs/logger'

const router = express.Router()

const logger = createLogger('route')
function generateRoutes(endpoints, routeOpened = false) {
  function createRoute(route) {
    if (routeOpened) {
      logger.verbose(`Creating route: ${route.path}`)
      return route.handlers
        ? router[route.method](route.path, ...route.handlers, route.action)
        : router[route.method](route.path, route.action)
    }

    return route.handlers
      ? router[route.method](route.path, [...route.handlers], route.action)
      : router[route.method](route.path, route.action)
  }

  function createRoutes(routes) {
    return routes.map(createRoute)
  }
  createRoutes(endpoints)
}

const initialRoutes = []
const endpoints = initialRoutes.concat()

generateRoutes(endpoints, true)

export default router
