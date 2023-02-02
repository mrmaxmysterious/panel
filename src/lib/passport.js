const LocalStrategy = require("passport-local").Strategy;
const prisma = require("./database");
const bcrypt = require("bcrypt");
const deleteProps = require("./deleteProps");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(async function verify(username, password, callback) {
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

        return callback(null, deleteProps(["password", user]));
      } catch (error) {
        return callback(error);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) return done(true, null);

    done(null, user);
  });
};
