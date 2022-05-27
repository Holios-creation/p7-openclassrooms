/**
 * Importation des plugins pour le traitement des données
 */
const express = require('express');
const router = express.Router();

/**
 * Importation des fichiers pour l'éxécution des fonction associé à la demande
 */
const articleCtrl = require('../controllers/article');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

/**
 * Définition de la route / pour une demande GET
 */
router.get('/', articleCtrl.getArticles);

/**
 * Définition de la route / pour une demande POST
 */
router.post('/', auth, multer, articleCtrl.addArticle);

/**
 * Définition de la route /:id/like pour une demande POST
 */
router.post('/like/:id', auth, articleCtrl.likeArticle);

/**
 * Définition de la route / pour une demande POST
 */
router.post('/comment/:id', auth, multer, articleCtrl.addArticleComment);

/**
 * Renvoie du résultat de la requete
 */
module.exports = router;