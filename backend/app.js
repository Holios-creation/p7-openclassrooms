/**
 * Importation des plugins pour le traitement des données
 */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

/**
 * Importation des routes de configuration
 */
const userRoutes = require('./routes/user');
const articleRoutes = require('./routes/article');

/**
 * Définition du header des réponses de l'API
 */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

/**
 * validation des données fournis
 */
app.use(bodyParser.json());

/**
 * Acceptation du format json
 */
app.use(express.json());

/**
 * Recherche de la route associé à la requète sur les différents fichiers de configuration
 */
app.use('/api/auth', userRoutes);
app.use('/api/article', articleRoutes);

/**
 * Redirection des imageURL vers l'image héberger sur l'API
 */
app.use('/images', express.static(path.join(__dirname, 'images')));

/**
 * Renvoie du résultat de la requete
 */
module.exports = app;