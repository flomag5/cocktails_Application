/** JWT */

/** Import modules nécessaires */
const jwt = require('jsonwebtoken')

/** Extraction du token */
const extractBearer = authorization => {

    if (typeof authorization !== 'string') {
        return false
    }
    // On isole le token
    const matches = authorization.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2]
}

/** Vérification de présence du token */
const checkToken = (req, res, next) => {
    const token = req.headers.authorization && extractBearer(req.headers.authorization)

    if (!token) {
        return res.status(401).json({ message: 'Invalid Tentative !!' })
    }

    // Vérifier validité du token
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ message: 'Bad Token Entry!!' })
        }
        next()
    })
}

module.exports = checkToken