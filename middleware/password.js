const passwordSchema = require('../models/Password');

module.exports = (req, res, next) => {
    if(!passwordSchema.validate(req.body.password)) {
        res.writeHead(400, 'Le mot de passe doit contenir entre 8 et 100 caractères, avoir une majuscule et contenir au moins 2 chiffres!');
        res.end('Le format du mot de passe est incorrect !');
    } else {
        next();
    }

};