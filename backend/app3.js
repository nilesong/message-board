//Express
var express = require('express')
var app = express();
var messages = require('./model/messages')
var cors = require('cors');

//MongoDB
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = "mongodb+srv://testuser2:BJPf2aQAfcovh6T4@cluster0.s73tn0s.mongodb.net/?retryWrites=true&w=majority"


main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

//CORS
app.use(cors());

//Routes
app.get('/', (req,res) => {
    res.send('Hello World')
})

app.get('/post', async (req,res) => {
    try{
        const allMessages = await messages.find()
        res.json(allMessages)
        console.log('hello')
    }catch(err){
        console.log(err)
    }
})

app.get('/upload', async (req,res) => {
    try{
        const message = new messages({
            message: "Hello",
            uploadDate: new Date("2024-01-24")
        });
        await message.save();
        await console.log('Upload success');
    }catch(err){
        console.log(err)
    }
})

//Listen
app.listen(4000, ()=>{
    console.log('Listening on port 4000')
})