const db = require("../db/queries.js");
const passport = require("passport");
const bcrypt = require("bcrypt");
const {
  validationResult,
  matchedData,
} = require("express-validator");
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

function createAuthorToken(author) {
  return jwt.sign(
    {
      author: {
        id: author.id,
        email: author.email,
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

async function authorSignup(req, res, next) {
  try {
        console.log("authorSignup hit");
    console.log("body:", req.body);
    const {
      first_name,
      last_name,
      email,
      password,
    } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    const existingAuthor = await db.getAuthorByEmail(email);

    if (existingAuthor) {
      return res.status(400).json({
        error: "Author already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const author = await db.createAuthor(
      first_name,
      last_name,
      email,
      hashedPassword
    );

    const token = createAuthorToken(author);

    return res.status(201).json({
      token,
      author: {
        id: author.id,
        first_name: author.first_name,
        last_name: author.last_name,
        email: author.email,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function authorLogin(req, res, next) {
  try {
    const { email, password } = req.body;

    const author = await db.getAuthorByEmail(email);

    if (!author) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    const match = await bcrypt.compare(
      password,
      author.password
    );

    if (!match) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    const token = createAuthorToken(author);

    return res.json({
      token,
      author: {
        id: author.id,
        first_name: author.first_name,
        last_name: author.last_name,
        email: author.email,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function getAuthor(req, res) {
  return res.json({
    id: req.user.id,
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    email: req.user.email,
  });
}

module.exports = {
  login,
  signup,
  getUser,
  authorSignup,
  authorLogin,
  getAuthor,
};