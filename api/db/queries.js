const prisma = require("./prisma");

async function createUser(first_name, last_name, username, password){
    return await prisma.user.create({
        data: {
            username: username,
            password: password
        }
    })
}

module.exports = {
    createUser
}   