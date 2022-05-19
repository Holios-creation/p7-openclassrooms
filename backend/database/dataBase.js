require('dotenv').config();
const mysql = require('mysql2');

/**
 * Parametres de connexion a la base de donnée
 */
const sql = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: `${process.env.MDP_DB}`,
    insecureAuth: true
});

/**
 * Traitement de l'état de connection a la db
 */
sql.connect(function (err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connexion à la base de donnée réussie !');
});

module.exports = sql;