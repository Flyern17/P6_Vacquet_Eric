const Sauce = require('../models/Sauce');
const fs = require('fs');


exports.likeSauce = (req, res, next) => {
    const likes = req.body.like;
    const userId = req.body.userId;
    console.log(req.body)
    // Creer un nouvel objet Sauce avec les différents ajouts => Faire le switch ici
    // const sauce = new Sauce({})
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => {
        switch(likes) { 
          // Si le user like ou dislike la sauce, il faut faire une MAJ sur la base de donnée -> Nombre de likes dislikes && users qui ont likes dislikes
          // 3 cas possibles => likeValue == 1 (Likes)/ likeValue == 0 (Rien selectionné) / likeValue == -1 (Dislikes)
            case 1: // Si l'user like la sauce
              Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: +1 }, $push: { usersLiked: userId }})
                .then(() => res.status(201).json({ message: 'Object liked !' }))
                .catch(error => res.status(400).json({ error }));
            break;
            case -1: // Si l'user dislike la sauce
              Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: +1 }, $push: { usersDisliked: userId }})
              .then(() => res.status(201).json({ message: 'Object disliked !' }))
              .catch(error => res.status(400).json({ error }));
            break;
            case 0: // Si l'user se retracte
              // Cas ou l'user annule son like 
              if(sauce.usersLiked.includes(userId)) {
                Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: userId }})
                .then(() => res.status(200).json({ message: 'Update status !' }))
                .catch(error => res.status(400).json({ error }));
              } 
              // Cas ou l'user annule son dislike
              else if(sauce.usersDisliked.includes(userId)) {
                Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: userId }})
                .then(() => res.status(200).json({ message: 'Update status !' }))
                .catch(error => res.status(400).json({ error }));
              }
            break;
          }
      })
      .catch(error => res.status(500).json({ error }));

}

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
      .catch(error => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
    { 
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1]
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
};

exports.findOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
};

exports.findAllSauce = (req, res, next) => {
    Sauce.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }));
};