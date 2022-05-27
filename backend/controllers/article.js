/**
 * Importation du plugin pour le traitement des données
 */
const fs = require('fs');
const db = require('../database/dataBase');

/**
 * Fonction de traitement de la requete d'affichage de tous les articles
 */
exports.getArticles = (req, res, next) => {
    db.query('SELECT groupomania.article.titre, groupomania.article.date, groupomania.article.image, groupomania.article.like, groupomania.article.id, groupomania.utilisateur.name, groupomania.utilisateur.profilePicture, COUNT(groupomania.comment.id) as commentaire FROM groupomania.article LEFT JOIN groupomania.utilisateur ON groupomania.article.idCreator = groupomania.utilisateur.id LEFT JOIN groupomania.comment ON groupomania.utilisateur.id = groupomania.comment.idArticle WHERE groupomania.article.idCreator = groupomania.utilisateur.id AND groupomania.utilisateur.id = groupomania.comment.idArticle GROUP BY groupomania.article.id ORDER BY groupomania.article.id DESC', 
    (error, results) => {
        console.log(results);
        if (error) {
            return res.status(400).json({ error });
        }
        return res.status(200).json(results);
    });
};

/**
 * Fonction de traitement de la requete d'affichage du nombre de commentaires d'un article en fonction de son Id
 */
exports.getArticleComment = (req, res, next) => {
    db.query('SELECT * FROM groupomania.comment WHERE idArticle = ?',
    [req.params.id],
     (error, result) => {
        if (error) {
            return res.status(400).json({ error });
        }
        console.log(result)
        return res.status(200).json(result);
    });
};

/**
 * Fonction de traitement de la requete d'ajout d'un article
 */
exports.addArticle = (req, res, next) => {
    const imgUrl = 'file' in req ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;
    db.query(`INSERT INTO groupomania.article (titre, date, image, idCreator) VALUES ( ?, NOW(), ?, ?)`,
    [req.body.title, imgUrl, req.body.creatorID],
    (error, result) => {
        if (error) {
            return res.status(400).json({ error });
        }
        return res.status(201).json({
            message: 'Votre post à été publié !'
        })
    });
};

/**
 * Fonction de traitement de la requete de like d'un article par rapport à son id
 */
exports.likeArticle = (req, res, next) => {
    db.query('SELECT * FROM groupomania.article WHERE id = ?',
    [req.params.id],
    (error, result) => {
        if (error) {
            return res.status(400).json({ error });
        }
        const usersLiked = result.userliked;
        if (usersLiked.indexOf(req.auth.userId) == -1) {
            usersLiked.push(req.auth.userId);
            const userLikeObject = {
                like: result.like + 1,
                userliked: usersLiked,
            };
            Sauce.updateOne({ _id: req.params.id}, { ...userLikeObject, _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Le like à bien été pris en compte !' }))
                .catch(error => res.status(400).json({ error }));
        } else {
            return res.status(300).json({
                message: 'Vous ne pouvez pas liker plusieurs fois !'
            })
        }        
    })
    .catch(error => res.status(404).json({ error }));
};

exports.addArticleComment = (req, res, next) => {
    db.query(`INSERT INTO groupomania.comment (idArticle, date, text) VALUES ( ?, NOW(), ?)`,
    [req.body.idArticle, req.body.text],
    (error, result) => {
        if (error) {
            return res.status(400).json({ error });
        }
        return res.status(201).json({
            message: 'Votre commentaire à été publié !'
        })
    });
}