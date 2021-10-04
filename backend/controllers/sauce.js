const { json } = require('express');
const Sauce = require('../models/sauce');
const fs = require('fs');
// ajout du nouvelle sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  // Enregistrement de l'objet dans la base de données
  sauce.save()
    .then(() => res.status(201).json({ message: 'sauce enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};
 //Modifier la sauce
 exports.modifySauce = (req, res, next) => {
  const uptdateSauce = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...uptdateSauce, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'sauce  modifié !'}))
    .catch(error => res.status(400).json({ error }));
};
  // supression de sauce 
  exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };
  
  // affichage de la nouvelle sauce
  exports.getOneSauce =(req, res, next) => {
    Sauce.findOne({
      _id: req.params.id
    }).then(
      (sauce) => {
        res.status(200).json(sauce);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };
//affichage page sauce
  exports.getAllSauces=(req, res, next) => {
    Sauce.find().then(
      (sauces) => {
        res.status(200).json(sauces);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };
  