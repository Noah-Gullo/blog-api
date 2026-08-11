const db = require("../db/queries.js");
const { prisma } = require("../lib/prisma.js"); 
const passport = require('passport');
const bcrypt = require("bcrypt");
const { body, validationResult, matchedData } = require("express-validator");
const jwt = require("jsonwebtoken");

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

      const token = jwt.sign(
        {
          user: {
            id: user.id,
            username: user.username,
          },
        },
        process.env.SESSION_SECRET,
        {
          expiresIn: "1h",
        }
      );

      return res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
        },
      });
    }
  )(req, res, next);
}

async function signup(req, res, next){
    if(req.user){
        return res.status(403).json({errors: "You must log out if you want to sign up."});
    }
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {first_name, last_name, email, password} = matchedData(req);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.createUser(first_name, last_name, email, hashedPassword);
    res.status(201).json({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    });
}

module.exports = {
    login,
    signup
}