const express = require('express');
const mongoose = require('mongoose');
const userPath = require('./routes/user');
const bookPath = require('./routes/book');
const app = express();

app.use(express.json());

//Base de donnée
mongoose.connect('mongodb+srv://justinelaunay8:LHb0ueUs7PKANfvE@cluster0.vvdu3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  )
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

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
app.use('/api/auth', userPath);
app.use('/api/books', bookPath);
app.use('/images', express.static('images'));

module.exports = app;