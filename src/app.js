require("dotenv").config();
const express = require("express");
const app = express();
const { Logger } = require("@blazingworks/logger");
const PrettyConsoleTransport = require("@blazingworks/logger-transport-prettyconsole")

const logger = new Logger({
  transports: [
    {
      module: new PrettyConsoleTransport({})
    }
  ]
})

app.listen(process.env.PORT, () => {
  logger.info(`Server opened on ${process.env.PORT}`)
})

module.exports.logger = logger;