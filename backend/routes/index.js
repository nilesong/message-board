const express = require('express')
const router = express.Router();

const mesController = require("../controller/messages_controller")
const userController = require("../controller/users_controller")

//Main page
router.get('/post/:username', mesController.messages_list);
router.get('/success/:username', userController.user_loginSuccess)

//Create
router.post('/post', mesController.messages_post);
router.post('/register', userController.user_register);

//Edit
router.put('/edit/:id', mesController.messages_put);

//Delete
router.delete('/delete/:id', mesController.messages_delete)

module.exports = router;