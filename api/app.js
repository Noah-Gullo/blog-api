require("dotenv").config(); 

const express = require("express");
const passport = require("./passport.js");
const path = require("node:path");
const cors = require("cors");
const indexRouter = require("./routes/indexRouter.js");

const app = express();

const corsOptions = {
    origin: [
        process.env.CLIENT_FRONTEND_URL,
        process.env.ADMIN_FRONTEND_URL,
    ].filter(Boolean),
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use(passport.initialize());

app.use("/", indexRouter);

const PORT = 3000;
app.listen(PORT, (error) => {
    if (error) throw error;
    console.log(`Express app listening at http://localhost:${PORT}/`);
});
