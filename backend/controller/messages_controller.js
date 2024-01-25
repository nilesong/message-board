const messages = require("../model/messages")
const asyncHandler = require("express-async-handler");

exports.messages_list = asyncHandler(async (req, res, next) => {
    const allMessages = await messages.find().exec();
    res.json(allMessages);
    console.log('hello');
})

exports.messages_post = asyncHandler(async (req, res, next) => {
    const message = new messages({
        name: "User",
        message: "Hello",
        uploadDate: new Date()
    });
    await message.save();
})

// exports.messages_create_get = asyncHandler(async (req,res,next) => {
//     res.send('not yet done')
// })

exports.messages_delete = asyncHandler(async (req, res, next) => {
    const message = await messages.find({_id: "65aff783d67e4131e03ebe8a"}).exec()
    if (message.length >0){
        await messages.findByIdAndDelete({_id: "65aff783d67e4131e03ebe8a"}).exec()
        res.send('ok');
    } else{
        res.send('not ok')
    }

})

exports.messages_delete2 = asyncHandler(async (req, res, next) => {
    res.send(req.params.id)
    console.log(req.params.id)
    const message = await messages.find({_id: req.params.id}).exec()
    if (message.length > 0){
        await messages.findByIdAndDelete({_id: req.params.id}).exec()
        res.send('ok');
    } else{
        res.send('not ok')
    }
})