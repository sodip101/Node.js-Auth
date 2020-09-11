const express = require('express');
const mongoose = require('mongoose');
const authRoutes=require('./routes/authRoutes.js');
const cookieParser=require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware.js');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://pidos:sodip101@cluster0.rfghy.gcp.mongodb.net/node_auth?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result)=>console.log('Successfully Connected!'))
  .then(() => app.listen(5000))
  .catch((err) => console.log(err));

// routes
app.get('*',checkUser);
app.use(authRoutes);
app.get('/',(req, res) => res.render('home'));
app.get('/smoothies',requireAuth, (req, res) => res.render('smoothies'));

//cookies
//set cookies
app.get('/set-cookies',(req,res)=>{
  res.cookie('newUser', true,{
    maxAge:1000*60*60*24,
    httpOnly:true
  });

  res.send('cookie has been set');
});

//read cookies
app.get('/read-cookies',(req,res)=>{
  const cookies=req.cookies;
  console.log(cookies.newUser);
  res.json(cookies);
});