const passport = require("passport");

const {
  Strategy: LocalStrategy,
} = require("passport-local");

const {
  Strategy: JwtStrategy,
  ExtractJwt,
} = require("passport-jwt");

const { compare } = require("bcryptjs");

const db = require("./db/queries.js");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await db.getUserByEmail(email);

        if (!user) {
          return done(null, false, {
            message: "Incorrect email",
          });
        }

        const match = await compare(
          password,
          user.password
        );

        if (!match) {
          return done(null, false, {
            message: "Incorrect password",
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "jwt",
  new JwtStrategy(
    {
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),

      secretOrKey:
        process.env.SESSION_SECRET,
    },

    async (payload, done) => {
      try {
        if (!payload.user) {
          return done(null, false);
        }

        const user = await db.getUserById(
          payload.user.id
        );

        if (!user) {
          return done(null, false);
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

passport.use(
  "author-jwt",
  new JwtStrategy(
    {
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),

      secretOrKey:
        process.env.SESSION_SECRET,
    },

    async (payload, done) => {
      try {
        if (!payload.author) {
          return done(null, false);
        }

        const author = await db.getAuthorById(payload.author.id);
        
        if (!author) {
          return done(null, false);
        }

        return done(null, author);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

module.exports = passport;