const passport = require("passport");
const prisma = require("./prisma");

async function createUser(first_name, last_name, username, password){
    return await prisma.user.create({
        data: {
            username: username,
            password: password
        }
    })
}

async function getUser(id){
    return await prisma.user.findUnique({
        where: {id: Number(id)},
        select: {
            username: true,
            password: true,
        }
    })
}

async function createPost(title, text, userID){
    return await prisma.user.create({
        data: {
            title: title,
            body: text,
            authorID: userID
        }
    })
}

async function getAllPublished(){
    return await prisma.post.findMany();
}

async function getSpecificPost(postID){
    return await prisma.post.findUnique({
        where: { id: Number(postID)}
    });
}

async function createPost(authorID, title, body){
    return await prisma.post.create({
        data: {
            title: title,
            body: body,
            authorID: Number(authorID),
            isPublished: false
        }
    })
}

async function updatedPostStatus(postID){
    const currStatus = await prisma.findUnique({
        where: { id: Number(postID)},
        select: {
            isPublished
        }
    })
    return await prisma.post.update({
        where: { id: Number(postID)},
        data: {isPublished: !currStatus}
    })
}

module.exports = {
    createUser,
    getUser,
    createPost,
    getAllPublished,
    getSpecificPost
}   