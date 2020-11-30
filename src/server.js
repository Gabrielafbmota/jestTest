import app from './app'
import { mongoConnection } from './app'

const port = process.env.PORT || 8080

async function serverConnection() {
  await mongoConnection
  app.listen(port)
}

serverConnection()
