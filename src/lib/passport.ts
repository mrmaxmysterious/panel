import { Strategy } from "passport-local";
import { PassportStatic } from "passport";
import { prisma } from "./database";
import bcrypt from "bcrypt";
import deleteProps from "./deleteProps";
import { logger } from "../app";

export default function passport(passport: PassportStatic) {
  passport.use(
    new Strategy(async function verify(
      username: string,
      password: string,
      callback: any
    ) {
      try {
        const user = await prisma.user.findUnique({
          where: {
            username,
          },
        });
        if (!user)
          return callback(null, false, { message: "Incorrect credentials" });

        const doesMatch = await bcrypt.compare(password, user.password);
        if (!doesMatch)
          return callback(null, false, { message: "Incorrect credentials" });

        logger.info(`User ${user.username} logged in`);
        return callback(null, deleteProps(["password"], user));
      } catch (error) {
        console.error(error);
        return callback(error);
      }
    })
  );

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) return done(true, null);

    done(null, user);
  });
}
