const db = require("../db/queries.js");
const { prisma } = require("../lib/prisma.js"); 

async function getPublishedPosts(req, res){
    
}

async function getSpecificPost(req, res){

}

async function createPost(req, res, title, authorID, body, date){
    
}

async function updatePostStatus(req, res, postID){

}

async function deletePost(req, res, postID){

}

module.exports = {
    getPublishedPosts,
    getSpecificPost,
    createPost,
    updatePostStatus,
    deletePost
}