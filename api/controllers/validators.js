const db = require("../db/queries.js");
const { body } = require("express-validator");

const validateSignup = [
    body("first_name")
        .trim()
        .notEmpty()
        .withMessage("First name is required"),

    body("last_name")
        .trim()
        .notEmpty()
        .withMessage("Last name is required"),
        
    body("email")
        .trim()
        .notEmpty()
        .isEmail().withMessage("Username must be an email")
        .isLength({min: 3, max: 30}).withMessage("Username/email must be at least 3 and no greater than 30")
        .custom(async (value) => {
            const user = await db.getUserByEmail(value);
            if (user) throw new Error("Username already exists");
        }),

    body("password")
        .trim()
        .notEmpty()
        .isLength({min: 6, max: 30}).withMessage("Must be at least 6 and no greater than 30"),
    
    body("confirm")
        .custom((value, {req}) => {
            return value == req.body.password
        }).withMessage("Passwords do not match"),
]

const validateComment = [
    body("text")
        .trim()
        .isLength({ min: 1, max: 1000}).withMessage("Comment must be at least between 1 and 1000 characters")
]

module.exports = {
    validateSignup,
    validateComment,
}