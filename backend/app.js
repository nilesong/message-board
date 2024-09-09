var express = require('express');
var app = express();
var cors = require('cors');
const session = require("express-session");
// const session = require("cookie-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const users = require("./model/users")

//Mongoose
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.DATABASE_URI
// const mongoDB = "mongodb+srv://testuser2:BJPf2aQAfcovh6T4@cluster0.s73tn0s.mongodb.net/?retryWrites=true&w=majority"

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

//CORS
app.use(cors())

//Parse JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());


//Passport
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await users.findOne({ username: username });
      if (!user) {
        console.log('loginfail')
        return done(null, false, { message: "Incorrect username" });
      };
      console.log('userok');
      if (user.password !== password) {
        console.log('loginfail')
        return done(null, false, { message: "Incorrect password" });
      };
      console.log('loginok')
      return done(null, user);
    } catch(err) {
      return done(err);
    };
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await users.findById(id);
    done(null, user);
  } catch(err) {
    done(err);
  };
});


//Routes
var indexRouter = require("./routes/index")
app.use('/', indexRouter)

app.post("/login",
  passport.authenticate("local", {
    failureRedirect: "/fail",
  }),
  (req, res) => {
    res.redirect(`/success/${req.user.username}`)
  }
);

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("http://localhost:3000/");
  });
});

app.get('/fail', (req,res) => {
  res.redirect("http://localhost:3000/login")
})

//Listen at port 4000
app.listen(4000, ()=>{
    console.log(`listening on port 4000`)
    console.log(mongoDB);
})