const express = require('express')
const router = express.Router();

const mesController = require("../controller/messages_controller")

//Main page
router.get('/post', mesController.messages_list);

//Create
router.post('/post', mesController.messages_post);

//Delete
router.delete('/delete/:id', mesController.messages_delete2)

module.exports = router;