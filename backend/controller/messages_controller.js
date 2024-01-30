const messages = require("../model/messages")
const asyncHandler = require("express-async-handler");

exports.messages_list = asyncHandler(async (req, res, next) => {
    const allMessages = await messages.find().exec();
    res.json(allMessages);
    console.log('hello');
})

// exports.messages_post2 = asyncHandler(async (req, res, next) => {
//     const message = new messages({
//         name: "User",
//         message: "Hello",
//         postDate: new Date()
//     });
//     await message.save();
// })

exports.messages_post = asyncHandler(async (req, res, next) => {
    const message = new messages({
        name: req.body.name,
        message: req.body.message,
        postDate: req.body.postDate
    })
    await message.save();
})


// exports.messages_create_get = asyncHandler(async (req,res,next) => {
//     res.send('not yet done')
// })

exports.messages_delete = asyncHandler(async (req, res, next) => {
    const message = await messages.find({_id: req.params.id}).exec()
    if (message.length > 0){
        await messages.findByIdAndDelete({_id: req.params.id}).exec()
    } else{
        res.send('ID not found')
    }
})