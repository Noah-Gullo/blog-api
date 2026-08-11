const { json } = require("express");
const db = require("../db/queries.js");
const { prisma } = require("../lib/prisma.js"); 
const { body, validationResult, matchedData } = require("express-validator");

async function createComment(req, res, next) {
  try {
    if (!req.user) {
        return res.status(401).json({
            error: "You must be logged in to post a comment",
        });
    }
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
    return res.status(400).json({
        errors: errors.array(),
    });
    }

    const { text } = matchedData(req);
    const userID = req.user.id;
    const postID = Number(req.params.postID);

    const comment = await db.createComment(
      text,
      userID,
      postID
    );

    return res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
}

async function deleteComment(req, res){
    if(!req.user){
        return res.status(401).json({ error: "You must be logged in to delete a comment"})
    }

    const { commentID } = req.params;
    await db.deleteComment(commentID);
}

module.exports = {
    createComment,
}