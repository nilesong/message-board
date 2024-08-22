const users = require("../model/users");
const asyncHandler = require("express-async-handler")

exports.user_register = asyncHandler(async (req, res, next) => {
    console.log(req.body.username);
    const user = new users({
        username: req.body.username,
        password: req.body.password,
    })
    await user.save();
    res.redirect("http://localhost:3000/login")
})

//PROBABLY DON'T NEED THIS - go straight to app.js
exports.user_loginSuccess = asyncHandler(async (req, res, next) => {
    res.redirect(`http://localhost:3000/thread/${req.params.username}`)
})