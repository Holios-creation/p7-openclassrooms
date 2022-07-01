/**
 * Importation du plugin pour le traitement des données
 */
const bcrypt = require('bcrypt');
const fs = require('fs');
const db = require('../database/dataBase');

/**
 * Fonction de traitement de la requete d'affichage de tous les articles
 */
exports.getArticles = (req, res, next) => {
    db.query('SELECT groupomania.article.titre, groupomania.article.date, groupomania.article.image, groupomania.article.like, groupomania.article.id, groupomania.utilisateur.name, groupomania.utilisateur.profilePicture, COUNT(groupomania.utilisateur.id) as comment FROM groupomania.article LEFT JOIN groupomania.utilisateur ON groupomania.article.idCreator = groupomania.utilisateur.id INNER JOIN groupomania.comment ON groupomania.article.id = groupomania.comment.idArticle WHERE groupomania.article.idCreator = groupomania.utilisateur.id AND groupomania.article.id = groupomania.comment.idArticle GROUP BY groupomania.article.id ORDER BY groupomania.article.id DESC', 
    (error, results) => {
        if (error) {
            return res.status(400).json({ error });
        }
        return res.status(200).json(results);
    });
};

/**
 * Fonction de traitement de la requete d'affichage d'un article
 */
exports.getOneArticle = (req, res, next) => {
    db.query('SELECT groupomania.article.titre, groupomania.article.date, groupomania.article.image, groupomania.article.like, groupomania.article.id, groupomania.utilisateur.name, groupomania.utilisateur.profilePicture, COUNT(groupomania.utilisateur.id) as comment FROM groupomania.article LEFT JOIN groupomania.utilisateur ON groupomania.article.idCreator = groupomania.utilisateur.id INNER JOIN groupomania.comment ON groupomania.article.id = groupomania.comment.idArticle WHERE groupomania.article.id = ? AND groupomania.article.idCreator = groupomania.utilisateur.id AND groupomania.article.id = groupomania.comment.idArticle GROUP BY groupomania.article.id', 
    [req.params.id],
    (error, results) => {
        if (error) {
            return res.status(400).json({ error });
        }
        return res.status(200).json(results);
    });
};

/**
 * Fonction de traitement de la requete d'affichage des commentaires d'un article en fonction de son Id
 */
exports.getArticleComment = (req, res, next) => {
    db.query('SELECT * FROM groupomania.comment WHERE idArticle = ?',
    [req.params.id],
     (error, result) => {
        if (error) {
            return res.status(400).json({ error });
        }
        return res.status(200).json(result);
    });
};

/**
 * Fonction de traitement de la requete d'ajout d'un article
 */
exports.addArticle = (req, res, next) => {
    db.query(`INSERT INTO groupomania.article (titre, date, image, idCreator) VALUES ( '${req.body.titre}', NOW(), '${req.protocol}://${req.get('host')}/images/${req.file.filename}', '${req.auth.userId}')`,
    (error, results) => {
        if (error) {
            return res.status(400).json({ error });
        }
        db.query(`SELECT id FROM groupomania.article WHERE idCreator = ${req.auth.userId} ORDER BY id DESC`,
        (error, result) => {
            if (error) {
                return res.status(400).json({ error });
            }
            db.query(`INSERT INTO groupomania.comment (idArticle, date, text, idCreator) VALUES ( ?, NOW(), NULL, ?)`,
            [result[0].id, req.auth.userId],
            (error, resultat) => {
                if (error) {
                    return res.status(400).json({ error });
                }
                return res.status(201).json({
                    message: 'Article Ajouté !'
                })
            });
        });
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
        var userLiked = result[0].userliked;
        if (userLiked.indexOf(req.auth.userId) == -1) {
            userLiked = JSON.parse(userLiked);
            userLiked.push(req.auth.userId);
            var like = result[0].like + 1;
            db.query('UPDATE groupomania.article SET `like` = ?, `userliked` = ? WHERE id = ?',
            [like, JSON.stringify(userLiked), req.params.id],
            (error, result) => {
                if (error) {
                    return res.status(400).json({ error });
                } else {
                    return res.status(200).json({ indice: '1' });
                }
            });
        } else {
            userLiked = JSON.parse(userLiked);
            userLiked.splice(userLiked.indexOf(req.auth.userId), 1);
            var like = result[0].like - 1;
            db.query('UPDATE groupomania.article SET `like` = ?, `userliked` = ? WHERE id = ?',
            [like, JSON.stringify(userLiked), req.params.id],
            (error, result) => {
                if (error) {
                    return res.status(400).json({ error });
                } else {
                    return res.status(200).json({ indice: '-1' });
                }
            });
        }        
    })
};

/**
 * Fonction de traitement de la requete d'ajout d'un commentaire
 */
exports.addArticleComment = (req, res, next) => {
    db.query(`INSERT INTO groupomania.comment (idArticle, date, text, idCreator) VALUES ( ?, NOW(), ?, ?)`,
    [req.params.id, req.body.message, req.auth.userId],
    (error, result) => {
        if (error) {
            return res.status(400).json({ error });
        }
        return res.status(201).json({
            message: 'Votre commentaire à été publié !'
        })
    });
}

/**
 * Fonction de traitement de la requete d'affichage des commentaires d'un article en fonction de son Id
 */
 exports.deleteArticle = (req, res, next) => {
    db.query('DELETE FROM groupomania.article WHERE id = ?',
    [req.params.id],
     (error, result) => {
        if (error) {
            return res.status(400).json({ error });
        }
        db.query('DELETE FROM groupomania.comment WHERE idArticle = ?',
        [req.params.id],
        (error, result) => {
            if (error) {
                return res.status(400).json({ error });
            }
            return res.status(200).json(result);
        });
    });
};

/**
 * Fonction de traitement de la requete d'affichage des commentaires d'un article en fonction de son Id
 */
 exports.deleteComment = (req, res, next) => {
    db.query('DELETE FROM groupomania.comment WHERE id = ?',
    [req.params.id],
     (error, result) => {
        if (error) {
            return res.status(400).json({ error });
        }
        return res.status(200).json(result);
    });
};