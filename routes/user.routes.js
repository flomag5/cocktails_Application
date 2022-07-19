/** ROUTES USER */

/***********************************/
/*** Import des module nécessaires */
const express = require('express')
const userCtrl = require('../controllers/user.controllers')

/*** Récupération du routeur d'express */
let router = express.Router()


/** Middleware pour logger dates de req */
router.use((req, res, next) => {
    const event = new Date()
    console.log('USER Time:', event.toString())
    next()
})

/**********************************/
/*** Routage de la ressource User */

router.get('/', userCtrl.getAllUsers)

router.get('/:id', userCtrl.getUser)

router.put('', userCtrl.addUser)

router.patch('/:id', userCtrl.updateUser)

router.post('/untrash/:id', userCtrl.untrashUser)

router.delete('/trash/:id', userCtrl.trashUser)

router.delete('/:id', userCtrl.deleteUser)

module.exports = router