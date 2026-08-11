const passport = require("passport");
const prisma = require("./prisma");

async function createUser(first_name, last_name, email, password){
    return await prisma.user.create({
        data: {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password
        }
    })
}

async function getUserByEmail(email) {
  return prisma.user.findUnique({
    where: {
      email: email,
    },
  });
}

async function getUserById(id) {
  return prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });
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

async function getAllPublished(req, res){
    const posts = await prisma.post.findMany({
        where: { isPublished: true }
    });

    return posts;
};

async function getSpecificPost(postID) {
  return prisma.post.findUnique({
    where: {
      id: Number(postID),
    },
    include: {
      comments: {
        include: {
          user: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              email: true,
            },
          },
        },
        orderBy: {
          date: "asc",
        },
      },
    },
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

async function createComment(text, userID, postID) {
  return prisma.comment.create({
    data: {
      text,
      date: new Date(),
      userID,
      postID,
    },
    include: {
      user: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
        },
      },
    },
  });
}

async function deleteComment(commendID){
     return await prisma.comment.delete({
        where: { id: Number(id) },
    });
}

module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
    createPost,
    getAllPublished,
    getSpecificPost,
    createComment,
    deleteComment
}   