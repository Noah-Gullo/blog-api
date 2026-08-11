const db = require("../db/queries.js");
const { prisma } = require("../lib/prisma.js"); 

async function getPublishedPosts(req, res){
    const posts = await db.getAllPublished();
    return res.json(posts);
}

async function getSpecificPost(req, res){
    const postID = req.body.postID;
    res.json(await db.getSpecificPost(postID));
}

async function createPost(req, res){
    const { authorID, title, body};
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