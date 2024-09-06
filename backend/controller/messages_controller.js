const messages = require("../model/messages")
const asyncHandler = require("express-async-handler");

exports.messages_list = asyncHandler(async (req, res, next) => {
    const allMessages = await messages.find({thread: req.params.username}).exec();
    res.json(allMessages);
    console.log('React app fetching');
})

exports.messages_post = asyncHandler(async (req, res, next) => {
    const message = new messages({
        name: req.body.name,
        message: req.body.message,
        postDate: req.body.postDate,
        thread: req.body.thread,
    })
    await message.save();
})

exports.messages_put = asyncHandler(async (req, res, next) => {
    const message = await messages.find({_id: req.params.id}).exec()
    if (message.length > 0){
        await messages.findByIdAndUpdate({_id: req.params.id}, {
            message: req.body.message
        }).exec()
    } else{
        res.send('ID not found')
    }
    // await message.save();
})

exports.messages_delete = asyncHandler(async (req, res, next) => {
    const message = await messages.find({_id: req.params.id}).exec()
    if (message.length > 0){
        await messages.findByIdAndDelete({_id: req.params.id}).exec()
    } else{
        res.send('ID not found')
    }
})