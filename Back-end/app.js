const express = require('express');
const app = express();
const bookPath = require('./routes/book');
const userPath = require('./routes/user');

app.use(express.json());

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//Routes
app.use('/api/books', bookPath);
app.use('/api/auth', userPath);
app.use('/images', express.static('images'));

module.exports = app;