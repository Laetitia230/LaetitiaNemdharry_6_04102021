const passwordValidator = require('password-validator');
// Create a schema
const passwordschema = new passwordValidator();
// Add properties to it
passwordschema
.is().min(8)                                    // Longueur minimal 8
.is().max(100)                                  // Longueur maximum 100
.has().uppercase()                              // Doit contenir une lettre majuscule
.has().lowercase()                              // Doit contenir une lettre minuscule
.has().digits(2)                                // Doit contenir 2 chiffre 
.has().symbols(1)                               // Contient 1 caractere spécial 
.has().not().spaces()                           // Ne doit pas contenir d'espace
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklister ses valeurs
module.exports = passwordschema;
