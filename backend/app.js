var express = require('express');
var app = express();
var cors = require('cors');

//Mongoose
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = "mongodb+srv://boardadmin:AW4635VlniBwIhWe@cluster0.s73tn0s.mongodb.net/?retryWrites=true&w=majority";
const mongoDB2 = "mongodb+srv://testuser2:BJPf2aQAfcovh6T4@cluster0.s73tn0s.mongodb.net/?retryWrites=true&w=majority"


main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB2);
}

//CORS
app.use(cors())

//Parse JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
var indexRouter = require("./routes/index")
app.use('/', indexRouter)


app.get('/', (req,res) => {
    res.send('hello')
})

//Listen at port 4000
app.listen(4000, ()=>{
    console.log(`listening on port 4000`)
})