import express from 'express'

const router = express.Router()

function generateRoutes(endpoints, routeOpened = false) {
  function createRoute(route) {
    if (routeOpened) {
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
