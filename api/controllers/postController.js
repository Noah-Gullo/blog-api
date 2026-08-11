const db = require("../db/queries.js");
const { prisma } = require("../lib/prisma.js"); 
const { body, validationResult, matchedData } = require("express-validator");

async function getPublishedPosts(req, res){
    try{
        const posts = await db.getAllPublished();
        return res.json(posts);
    } catch (error) {
        console.log(error);
    return res.status(500).json({ 
      error: "Internal Server Error", 
      message: error.message 
    });
  }
}

async function getSpecificPost(req, res){
    const postID = req.params.postID;
    res.json(await db.getSpecificPost(postID));
}

async function createPost(req, res){
    const { authorID, title, body} = matchData(req);
    await db.createPost(authorID, title, body);
}

async function updatePostStatus(req, res){
    const { id } = req.params;
    const updatedPost = await db.updatePostStatus(id);
    return res.json(updatePostStatus);
}


module.exports = {
    getPublishedPosts,
    getSpecificPost,
    createPost,
    updatePostStatus,
}