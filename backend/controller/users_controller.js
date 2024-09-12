const users = require("../model/users");
const asyncHandler = require("express-async-handler")

exports.user_register = asyncHandler(async (req, res, next) => {
    console.log(req.body.username);
    const username = await users.find({username: req.body.username}).exec()
    if (username.length > 0){
        console.log('username taken')
        res.redirect("https://message-board-nn7k.onrender.com/signupfail")
    } else{
        const user = new users({
            username: req.body.username,
            password: req.body.password,
        })
        await user.save();
        res.redirect("https://message-board-nn7k.onrender.com/")
    }

})

exports.user_loginSuccess = asyncHandler(async (req, res, next) => {
    res.redirect(`https://message-board-nn7k.onrender.com/thread/${req.params.username}`)
})