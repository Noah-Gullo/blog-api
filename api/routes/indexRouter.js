const { Router } = require('express');
const indexRouter = Router();

indexRouter.get("/posts/:postID");
indexRouter.post("/posts/:postID/:commentID");
indexRouter.get("/posts");



module.export = indexRouter