const db = require("../db/queries.js");
const { prisma } = require("../lib/prisma.js"); 
const { body, validationResult, matchedData } = require("express-validator");

async function createComment(req, res, text){
    if(!req.user){
        return res.status(401).json({error: "You must be logged in to post a comment"});
    }

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const text = matchedData(req);
    const userId = req.user.id;
    const post = await db.createComment(title, text, userId);
    res.status(201).json(post);
}

async function deleteComment(req, res, commentID){

}

module.exports = {
    createComment,
    deleteComment
}