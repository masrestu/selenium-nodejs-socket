const express = require('express')
const configApp = require('./config/ConfigApp')
const configDirectory = require('./config/ConfigDirectory')
const indexRouter = require('./routes/RouteController')

const app = express()

app.use('/', indexRouter)
app.use(
	express.static((configDirectory.publicDir))
)


// routines
const main = require('./routines/main')
const server = main(app)

const port = configApp.port
server.listen(port, "0.0.0.0", () => console.log(`app listening on port ${port}!`))