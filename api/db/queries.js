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

async function createPost(authorID, title, body) {
  return prisma.post.create({
    data: {
      title,
      body,
      authorID: Number(authorID),
      isPublished: false,
    },
  });
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

async function updatePostStatus(postID) {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(postID),
    },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  return prisma.post.update({
    where: {
      id: Number(postID),
    },
    data: {
      isPublished: !post.isPublished,
    },
  });
}

async function getAllPosts() {
  return prisma.post.findMany({
    orderBy: {
      id: "desc",
    },
  });
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

async function createAuthor(first_name, last_name, email, password) {
  return prisma.author.create({
    data: {
      first_name,
      last_name,
      email,
      password,
    },
  });
}

async function getAuthorByEmail(email) {
  return prisma.author.findUnique({
    where: {
      email,
    },
  });
}

async function getAuthorById(id) {
  return prisma.author.findUnique({
    where: {
      id: Number(id),
    },
  });
}

module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
    createPost,
    getAllPublished,
    getSpecificPost,
    getAllPosts,
    createComment,
    deleteComment,
    createAuthor,
    getAuthorByEmail,
    getAuthorById
}   