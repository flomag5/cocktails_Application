/** ROUTES COCKTAILS */

/***********************************/
/*** Import des module nécessaires */
const express = require('express')
const checkToken = require('../jsonwebtoken/check')
const cocktailCtrl = require('../controllers/cocktail.controllers')

/***************************************/
/*** Récupération du routeur d'express */
let router = express.Router()


/** Middleware pour logger dates de req */
router.use((req, res, next) => {
    const event = new Date()
    console.log('COCKTAIL Time:', event.toString())
    next()
})

/**************************************/
/*** Routage de la ressource Cocktail */

router.get('', cocktailCtrl.getAllCocktails)

router.get('/:id', cocktailCtrl.getCocktail)

router.put('', checkToken, cocktailCtrl.addCocktail)

router.patch('/:id', checkToken, cocktailCtrl.updateCocktail)

router.post('/untrash/:id', checkToken, cocktailCtrl.untrashCocktail)

router.delete('/trash/:id', checkToken, cocktailCtrl.trashCocktail)

router.delete('/:id', checkToken, cocktailCtrl.deleteCocktail)

module.exports = router