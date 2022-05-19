/**
 * Importation du plugin pour le traitement des tokens
 */
const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Protocole de gestion des tokens des utilisateurs
 */
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET_FOR_PROJECT_SEVEN_OF_THE_OPENCLASSROOMS_WEB_DEVELOPER_TRAINING');
        const userId = decodedToken.userId;
        req.auth =  { userId };
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable !';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée !' });
    }
};