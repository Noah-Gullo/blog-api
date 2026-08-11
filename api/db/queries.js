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

module.exports = {
    createUser
}   