/**
 * Importation des plugins pour le traitement des données
 */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../database/dataBase');

/**
 * Fonction de traitement de la requete d'inscription
 */
exports.signupUser = (req, res, next) => {
  db.query(`SELECT * FROM groupomania.utilisateur WHERE email = ?`,
    [req.body.email],
    (err, results) => {
      //Contrôle que l'email ne soit pas utilisé//
      if (results.length > 0) {
        res.status(401).json({
          message: 'L\'email est déjà utilisé.',
        });
      } else {
        //hashage du mot de passe//
        bcrypt
          .hash(req.body.password, 10)
          .then((hash) => {
            //Add to BDD +injection sql
            db.query(`INSERT INTO groupomania.utilisateur (email, name, profilePicture, password ) VALUES ('${req.body.email}','${req.body.name}','${req.protocol}://${req.get('host')}/images/${req.file.filename}','${hash}')`,
              (err, fields) => {
                if (err) {
                  return res.status(400).json(err);
                } else {
                  db.query('SELECT * FROM groupomania.utilisateur WHERE email = ?',
                  [req.body.email],
                  (err, resultats) => {
                    return res.status(200).json({
                      userId: resultats[0].id,
                      userName: resultats[0].name,
                      userProfilePicture: resultats[0].profilePicture,
                      token: jwt.sign({ userId: resultats[0].id }, 'RANDOM_TOKEN_SECRET_FOR_PROJECT_SEVEN_OF_THE_OPENCLASSROOMS_WEB_DEVELOPER_TRAINING', {
                        expiresIn: '24h',
                      }),
                    });
                  }
                )}
              }
            );
          })
          .catch((error) => res.status(500).json({ error }));
      }
    }
  );
};

/**
 * Fonction de traitement de la requete de connexion
 */
exports.loginUser = (req, res, next) => {
  db.query('SELECT * FROM groupomania.utilisateur WHERE email = ?',
    [req.body.email],
    (err, results) => {
      //si l'utilisateur existe dans la base de donnée//
      if (results.length > 0) {
        //vérification du mot de passe de l'utilisateur//
        bcrypt.compare(req.body.password, results[0].password).then((valid) => {
          if (!valid) {
            res.status(401).json({ message: 'Mot de passe incorrect' });
          } else {
            //création du token d'acces//
            res.status(200).json({
              userId: results[0].id,
              userName: results[0].name,
              userProfilePicture: results[0].profilePicture,
              token: jwt.sign({ userId: results[0].id }, 'RANDOM_TOKEN_SECRET_FOR_PROJECT_SEVEN_OF_THE_OPENCLASSROOMS_WEB_DEVELOPER_TRAINING', {
                expiresIn: '24h',
              }),
            });
          }
        });
      } else {
        res.status(404).json({ error: 'L\'utilisateur n\'existe pas' });
      }
    }
  );
};

/**
* Fonction de traitement de la requete de suppression d'un compte
*/
exports.deleteUser = (req, res, next) => {
 db.query('DELETE FROM groupomania.comment WHERE idCreator = ?',
   [req.auth.userId],
   (err, results) => {
    if (err) {
      return res.status(400).json({ err });
    }
   }
 );
 db.query('SELECT * FROM groupomania.article WHERE idCreator = ?',
   [req.auth.userId],
   (err, results) => {
    results.map(result => {
      db.query('DELETE FROM groupomania.comment WHERE idArticle = ?',
        [result.id],
        (err, results) => {
          if (err) {
            return res.status(400).json({ err });
          }
        }
      );
      db.query('DELETE FROM groupomania.article WHERE idCreator = ?',
        [req.auth.userId],
        (err, results) => {
          if (err) {
            return res.status(400).json({ err });
          }
        }
      );
    })
   }
 );
 db.query('DELETE FROM groupomania.utilisateur WHERE id = ?',
  [req.auth.userId],
  (err, results) => {
    if (err) {
      return res.status(400).json({ err });
    }
  }
  );
  return res.status(201).json({
    message: 'Toutes les informations ont bien été supprimées !'
})
};

/**
* Fonction de traitement de la requete d'obtention des données d'un utilisateur
*/
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

/**
* Fonction de traitement de la requete de modification des données d'un utilisateur
*/
exports.modifyDataUser = (req, res, next) => {
  db.query(`SELECT * FROM groupomania.utilisateur WHERE email = '${req.body.email}' AND id != ${req.auth.userId}`,
  (err, results) => {
    //Contrôle que l'email ne soit pas utilisé//
    if (results.length > 0) {
      res.status(401).json({
        message: 'L\'email est déjà utilisé.',
      });
    } else {
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

/**
* Fonction de traitement de la requete de vérification du grade d'un utilisateur
*/
exports.VerifyUser = (req, res, next) => {
  db.query(`SELECT grade FROM groupomania.utilisateur WHERE id = ?`,
  [req.auth.userId],
  (error, result) => {
      if (error) {
          return res.status(400).json({ error });
      }
      return res.status(200).json(result);
  });
}