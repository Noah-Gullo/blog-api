const { Router } = require("express");
const indexRouter = Router();

const {
  getPublishedPosts,
  updatePostStatus,
  getSpecificPost,
  getAllPosts,
  createPost,
} = require("../controllers/postController");

const {
  createComment,
  deleteComment,
} = require("../controllers/commentController");

const {
  login,
  signup,
  getUser,
  authorLogin,
  authorSignup,
} = require("../controllers/authController");

const {
  validateSignup,
  validateComment,
} = require("../controllers/validators");

const passport = require("../passport.js");


indexRouter.post(
  "/posts/:postID/comments",
  passport.authenticate("jwt", { session: false }),
  validateComment,
  createComment
);

indexRouter.get(
  "/posts/:postID",
  getSpecificPost
);

indexRouter.post(
  "/login",
  login
);

indexRouter.post(
  "/signup",
  validateSignup,
  signup
);

indexRouter.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  getUser
);


indexRouter.post(
  "/author/signup",
  authorSignup
);

indexRouter.post(
  "/author/login",
  authorLogin
);

indexRouter.get(
  "/admin/posts",
  passport.authenticate("author-jwt", { session: false }),
  getAllPosts
);

indexRouter.post(
  "/posts",
  passport.authenticate("author-jwt", { session: false }),
  createPost
);

indexRouter.patch(
  "/posts/:postID/publish",
  passport.authenticate("author-jwt", { session: false }),
  updatePostStatus
);

indexRouter.delete(
  "/comments/:commentID",
  passport.authenticate("author-jwt", { session: false }),
  deleteComment
);


indexRouter.get(
  "/",
  getPublishedPosts
);

module.exports = indexRouter;