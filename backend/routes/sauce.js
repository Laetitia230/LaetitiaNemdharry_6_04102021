const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const sauceCtrl = require('../controllers/sauce');
const multer = require('../middleware/multer-config');
//Fonctions importées et appliquées aux routes depuis le dossier Controllers
// ajout du nouveau produit
router.post('/',auth, multer, sauceCtrl.createSauce);
// affichage du nouveau produit 
router.get('/:id', sauceCtrl.getOneSauce);
 //Modifier le produit 
router.put('/:id',auth,multer, sauceCtrl.modifySauce); 
//supprimer un produit
router.delete('/:id',auth, sauceCtrl.deleteSauce);
//affichage page produit
router.get('/',auth, sauceCtrl.getAllSauces);
//creer un like ou dislike
router.post("/:id/like", auth, sauceCtrl.likeSauce); 
module.exports = router;