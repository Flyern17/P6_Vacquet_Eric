const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Nombre de requetes possibles pour chaque adresse IP
    message: "Nombre de requêtes dépassés, re-tentez dans 15m"
});

module.exports = limiter;