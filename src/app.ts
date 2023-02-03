import { config } from "dotenv";
config();

import express from "express";
import path from "node:path";
import passport from "passport";
import passportUtil from "./lib/passport";
import session from "express-session";
import { prisma } from "./lib/database";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { Logger } from "@blazingworks/logger";
import PrettyConsoleTransport from "@blazingworks/logger-transport-prettyconsole";

import auth from "./routers/auth";
import render from "./routers/public";

export const logger = new Logger({
  transports: [
    {
      module: new PrettyConsoleTransport(),
    },
  ],
});

const app = express();

passportUtil(passport);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use((req, res, next) => {
  logger.access(
    `${req.protocol.toUpperCase()}/${req.httpVersion} ${req.method} ${req.path}`
  );
  next();
});
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
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
app.use("/", render);

app.listen(process.env.PORT, () => {
  logger.info(`Server opened on ${process.env.PORT}`);
});
