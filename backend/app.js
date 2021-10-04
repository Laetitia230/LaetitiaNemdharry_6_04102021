const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// Permet de travailler avec les fichiers et les répertoires
const path = require('path');
// Sécuriser Express en définissant divers en-têtes HTTP
const helmet = require('helmet');
// Passer au HTTPS
const express_enforces_ssl = require('express-enforces-ssl');
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  app.use(bodyParser.json());
  app.use('/images', express.static(path.join(__dirname, 'images')));
  app.use('/api/sauces', sauceRoutes);
  app.use('/api/auth', userRoutes);
  app.use(helmet());
  app.use(express_enforces_ssl());
module.exports = app;

mongoose.connect('mongodb+srv://LN:yatasha@cluster0.fszbs.mongodb.net/LN?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
