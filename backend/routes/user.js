/**
 * Importation des plugins pour le traitement des données
 */
const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

/**
 * Importation du fichier pour l'éxécution des fonction associé à la demande
 */
const userCtrl = require('../controllers/user');

/**
 * Définition de la route /signup - ok
 */
router.post('/signup', multer, userCtrl.signupUser);

/**
 * Définition de la route /login - ok
 */
router.post('/login', userCtrl.loginUser);

/**
 * Définition de la route /delete - X
 */
 router.post('/delete', auth, userCtrl.deleteUser);

 /**
 * Définition de la route / pour une demande GET - ok
 */
router.get('/user', auth, userCtrl.getDataUser);

/**
 * Définition de la route / pour une demande POST - X
 */
router.post('/user', auth, userCtrl.modifyDataUser);

/**
 * Renvoie du résultat de la requete
 */
module.exports = router;