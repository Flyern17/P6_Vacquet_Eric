const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Nombre de requetes possibles pour chaque adresse IP
    message: "Vous avez fait trop de tentatives de connexion, re-tentez dans 15m"
});

module.exports = limiter;