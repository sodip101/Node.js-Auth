const express = require('express');
const mongoose = require('mongoose');
const authRoutes=require('./routes/authRoutes.js');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://pidos:sodip101@cluster0.rfghy.gcp.mongodb.net/node_auth?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result)=>console.log('Successfully Connected!'))
  .then(() => app.listen(5000))
  .catch((err) => console.log(err));

// routes
app.use(authRoutes);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));