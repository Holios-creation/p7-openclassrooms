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
        console.log(results);
        if (error) {
            return res.status(400).json({ error });
        }
        return res.status(200).json(results);
    });
};

exports.getOneArticle = (req, res, next) => {
    db.query('SELECT groupomania.article.titre, groupomania.article.date, groupomania.article.image, groupomania.article.like, groupomania.article.id, groupomania.utilisateur.name, groupomania.utilisateur.profilePicture, COUNT(groupomania.utilisateur.id) as comment FROM groupomania.article LEFT JOIN groupomania.utilisateur ON groupomania.article.idCreator = groupomania.utilisateur.id INNER JOIN groupomania.comment ON groupomania.article.id = groupomania.comment.idArticle WHERE groupomania.article.id = ? AND groupomania.article.idCreator = groupomania.utilisateur.id AND groupomania.article.id = groupomania.comment.idArticle GROUP BY groupomania.article.id', 
    [req.params.id],
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

exports.addArticleComment = (req, res, next) => {
    console.log(req.body.message);
    db.query(`INSERT INTO groupomania.comment (idArticle, date, text) VALUES ( ?, NOW(), ?)`,
    [req.params.id, req.body.message],
    (error, result) => {
        if (error) {
            return res.status(400).json({ error });
        }
        return res.status(201).json({
            message: 'Votre commentaire à été publié !'
        })
    });
}

exports.getDataUser = (req, res, next) => {
    db.query(`SELECT email, name, id FROM groupomania.utilisateur WHERE id = ?`,
    [req.auth.userId],
    (error, result) => {
        if (error) {
            return res.status(400).json({ error });
        }
        return res.status(200).json(result);
    });
}

exports.modifyDataUser = (req, res, next) => {
    db.query(`SELECT * FROM groupomania.utilisateur WHERE email = '${req.body.email}' AND id != ${req.auth.userId}`,
    (err, results) => {
      //Contrôle que l'email ne soit pas utilisé//
      if (results.length > 0) {
        res.status(401).json({
          message: 'L\'email est déjà utilisé.',
        });
      } else {
        console.log("--");
        console.log(req.body.email)
        console.log(req.body.name)
        console.log(hash)
        console.log(req.auth.userId)
        console.log("--");
        //hashage du mot de passe//
        bcrypt
          .hash(req.body.password, 10)
          .then((hash) => {
            //Add to BDD +injection sql
            db.query(`UPDATE groupomania.utilisateur SET email = '${req.body.email}', name = '${req.body.name}', password = '${hash}' WHERE id = ${req.auth.userId}`,
            (error, result) => {
                if (error) {
                    return res.status(400).json({ error });
                }
                console.log(result)
                return res.status(201).json({
                    message: 'Les informations de l\'utilisateur ont été modifées !'
                })
            });
          })
          .catch((error) => res.status(500).json({ error }));
      }
    }
  );
}