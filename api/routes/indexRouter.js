const { Router } = require('express');
const indexRouter = Router();
const { getPublishedPosts, updatePostStatus, getSpecificPost, getAllPosts, createPost } = require("../controllers/postController");
const { createComment } = require("../controllers/commentController");
const { login, signup, getUser } = require("../controllers/authController");
const { validateSignup, validateComment } = require("../controllers/validators");
const passport = require("../passport.js");

indexRouter.post("/posts/:postID/comments", passport.authenticate("jwt", { session: false }), validateComment, createComment);
indexRouter.get("/posts/:postID", getSpecificPost);
indexRouter.put("/posts/:postID/", updatePostStatus);
indexRouter.post("/login", login);
indexRouter.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  getUser
);
indexRouter.post("/signup", validateSignup, signup);
indexRouter.get(
  "/admin/posts",
  passport.authenticate("jwt", { session: false }),
  getAllPosts
);
indexRouter.get("/", getPublishedPosts);
indexRouter.post("/",    createPost);

module.exports = indexRouter