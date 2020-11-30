import app from './app'
const port = process.env.PORT || 8080

async function serverConnection() {
  app.listen(port, () => {
    console.log(`Connected on: http://0.0.0.0:${port}`)
  })
}

serverConnection()
