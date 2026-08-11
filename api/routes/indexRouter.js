const { Router } = require('express');
const indexRouter = Router();
const { getPublishedPosts, updatePostStatus, getSpecificPost, createPost } = require("../controllers/postController");
const { createComment } = require("../controllers/commentController");
const { login, signup } = require("../controllers/authController");

indexRouter.post("/posts/:postID/:commentID", createComment);
indexRouter.get("/posts/:postID", getSpecificPost);
indexRouter.put("/posts/:postID/", updatePostStatus);
indexRouter.get("/posts", getPublishedPosts);
indexRouter.post("/posts", createPost);

indexRouter.post("/login", login);
indexRouter.post("/signup", signup);

module.exports = indexRouter