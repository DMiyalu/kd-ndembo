function verifyToken(request, response, next) {
    console.log('verifyToken start')
    // Get auth header value
    const bearerHeader = request.headers['authorization']
    if(typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ')
        // Get token from array
        const bearerToken = bearer[1]
        // Set the token
        request.token = bearerToken
        next()
    } else {
        // FORBIDDEN
        response.status(403)
    }
}

module.exports = verifyToken