const validateSignup = [
    body("username")
        .trim()
        .notEmpty()
        .isAlphanumeric().withMessage("Must be alphanumeric")
        .isLength({min: 3, max: 30}).withMessage("Must be at least 3 and no greater than 30")
        .custom(async (value) => {
            const user = await db.getUser({username: value});
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
        .length({ min: 1, max: 1000}).withMessage("Comment must be at least between 1 and 1000 characters")
]

module.exports = {
    validateSignup,
    validateComment,
}