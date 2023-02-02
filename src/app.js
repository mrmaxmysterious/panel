require("dotenv").config();
const express = require("express");
const path = require("node:path");
const passport = require("passport");
const passportUtil = require("./lib/passport");
const session = require("express-session");
const prisma = require("./lib/database");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { Logger } = require("@blazingworks/logger");
const { ConsoleTransport } = require("@blazingworks/logger/transports");

const auth = require("./routers/auth");

const logger = new Logger({
  transports: [
    {
      module: new ConsoleTransport(),
    },
  ],
});

const app = express();

passportUtil(passport);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    name: "tideAuth",
    saveUninitialized: true,
    cookie: {
      maxAge: 7 * 24 * 60 * 60,
    },
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", auth);

app.listen(process.env.PORT, () => {
  logger.info(`Server opened on ${process.env.PORT}`);
});

module.exports.logger = logger;
