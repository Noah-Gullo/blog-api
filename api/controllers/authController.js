const db = require("../db/queries.js");
const { prisma } = require("../lib/prisma.js"); 
const passport = require('passport');
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtokne");

const validateUser = [

]

async function login(req, res, next){
    passport.authenticate("local", {
        session: false
    }), (error, user, info) => {
        if(error) return next(error);
    }

    const token = jwt.sign(
        {user: {id: user.id, username: user.username}}, 
        process.env.SESSION_SECRET,
        {expresIn: "1h"})
}

async function getUser(req, res){

}

async function signup(req, res, next){
    if(req.user){
        return res.status(403).json({error: "You must log out if you want to sign up."});
    }
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: error.array()});
    }

    const [first_name, last_name, username, password] = matchedData(req);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.createUser(username, hashedPassword);
    res.status(201).json(user);
}

module.exports = {
    login,
    getUser,
    signup
}