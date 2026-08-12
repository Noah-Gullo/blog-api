const db = require("../db/queries.js");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { validationResult, matchedData } = require("express-validator");
const jwt = require("jsonwebtoken");

function createToken(user) {
  return jwt.sign(
    {
      user: {
        id: user.id,
        email: user.email,
      },
    },
    process.env.SESSION_SECRET,
    {
      expiresIn: "1h",
    }
  );
}

function login(req, res, next) {
  passport.authenticate(
    "local",
    { session: false },
    
    (error, user, info) => {
      if (error) {
        return next(error);
      }

      if (!user) {
        return res.status(401).json({
          error: info?.message || "Invalid credentials",
        });
      }

      const token = createToken(user);

      return res.json({
        token,
        user: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        },
      });
    }
  )(req, res, next);
}

async function signup(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const {
      first_name,
      last_name,
      email,
      password,
    } = matchedData(req);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.createUser(
      first_name,
      last_name,
      email,
      hashedPassword
    );

    const token = createToken(user);

    return res.status(201).json({
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function getUser(req, res) {
  return res.json({
    id: req.user.id,
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    email: req.user.email,
  });
}

module.exports = {
  createToken,
  login,
  signup,
  getUser
};