const mongoose = require('mongoose');
//Creation schema de donnée. 
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: false },
  heat: { type: Number, required: true },
  likes: { type: Number, required: true, default: 0 },
  dislikes: { type: Number, required: true, default: 0 },
  usersLiked: { type: Array, required: true, default: [] },
  usersDisliked: { type: Array, required: true, default: [] },
});
//Exportation du schema en tant que modèle Mongoose apppelée Sauce
module.exports = mongoose.model('Sauce', sauceSchema);

