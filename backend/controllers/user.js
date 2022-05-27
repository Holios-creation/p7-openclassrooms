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
        console.log("ok");
        //hashage du mot de passe//
        bcrypt
          .hash(req.body.password, 10)
          .then((hash) => {
            console.log(req.body.email);
            console.log(req.body.name);
            console.log(req.protocol + '://' + req.get('host') + '/images/' + req.file.filename);
            console.log(hash);
            //Add to BDD +injection sql
            db.query(`INSERT INTO groupomania.utilisateur (email, name, profilePicture, password ) VALUES ('${req.body.email}','${req.body.name}','${req.protocol}://${req.get('host')}/images/${req.file.filename}','${hash}')`,
              (err, fields) => {
                if (err) {
                  return res.status(400).json(err);
                }
                return res.status(201).json({
                  message: 'Votre compte a bien été crée !',
                });
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
      console.log(req.body, results);
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