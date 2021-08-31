const passwordSchema = require('../models/Password');

module.exports = (req, res, next) => {
    if(!passwordSchema.validate(req.body.password)) {
        res.writeHead(400, 'Le mot de passe doit contenir entre 8 et 100 caractères, et également avoir une majuscule');
        res.end('Le format du mot de passe est incorrect !');
    } else {
        next();
    }

};