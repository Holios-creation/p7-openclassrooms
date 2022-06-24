/**
 * Importation du plugin pour le traitement des images
 */
const multer = require('multer');

/**
 * Dictionnaire définissant les formats accepté par l'application pour l'importation des images
 */
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
}

/**
 * Protocole de gestion de l'importation et de récupération des images sur le serveur
 */
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

/**
 * Renvoie du résultat de la requete
 */
module.exports = multer({ storage }).single('image');