const db = require("../db/queries.js");
const { prisma } = require("../lib/prisma.js"); 
const passport = require('passport');
const { validationResult } = require("express-validator");
import jwt from "jsonwebtoken"

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

async function createUser(req, res){

}

async function getUser(req, res){

}

async function signup(req, res, next){

}

module.exports = {
    login,
    createUser,
    getUser,
    signup
}