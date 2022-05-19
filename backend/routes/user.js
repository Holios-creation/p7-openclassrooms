/**
 * Importation des plugins pour le traitement des données
 */
const express = require('express');
const router = express.Router();

/**
 * Importation du fichier pour l'éxécution des fonction associé à la demande
 */
const userCtrl = require('../controllers/user');

/**
 * Définition de la route /signup
 */
router.post('/signup', userCtrl.signupUser);

/**
 * Définition de la route /login
 */
router.post('/login', userCtrl.loginUser);

/**
 * Renvoie du résultat de la requete
 */
module.exports = router;