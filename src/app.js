import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import router from './router'
import dbconnection from './repositories'
import { requestLogger, responseLogger } from './libs/logger'
const app = express()
const mongoConnection = dbconnection()

app.use(cors())
app.use(requestLogger)
app.use(bodyParser.json())
app.use(router)
app.use(responseLogger)

export default app
export { mongoConnection }
