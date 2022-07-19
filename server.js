/** Import modules nécessaires */

const express = require('express')
const cors = require('cors')
const checkToken = require('./jsonwebtoken/check')


/** Import connexion DB */
let DB = require('./db.config')

/** Initialisation de l'API */
const app = express()

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization"
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/** Import modules de routage */
const user_router = require('./routes/user.routes')
const cocktail_router = require('./routes/cocktail.routes')

const auth_router = require('./routes/auth')


/** Mise en place du routage */
app.get('/', (req, res) => res.send('Online. Well done !'))

app.use('/users', user_router)
app.use('/cocktails', cocktail_router)

app.use('/auth', auth_router)

app.get('*', (req, res) => res.status(501).send('WTF is going on !?!'))


/** Starting serveur avec test DB*/
DB.sequelize.authenticate()
    .then(() => console.log('Database connexion OK'))
    .then(() => {
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`This server is running on port ${process.env.SERVER_PORT}`)
        })
    })
    .catch(err => console.log('Database Erro', err))

