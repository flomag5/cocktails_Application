/** AUTH */

/** Import modules nécessaires */
const express = require('express')
const authCtrl = require('../controllers/auth')



/** Récupération routeur d'express */
let router = express.Router()


/** Middleware pour logger dates de req */
router.use((req, res, next) => {
    const event = new Date()
    console.log('AUTH Time:', event.toString())
    next()
})


/*** Routage de la ressource Auth */
router.post('/login', authCtrl.login)


module.exports = router