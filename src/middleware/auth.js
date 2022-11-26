const jwt = require("jsonwebtoken");

exports.authenticateToken = (req, res, next) => {
    //exclude the below path
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401) // if there isn't any token

    jwt.verify(token, process.env.SECRET_KEY || 'somesupersecretkey', (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        console.log(user)
        req.user = user
        next() // pass the execution off to whatever request the client intended
    })
}