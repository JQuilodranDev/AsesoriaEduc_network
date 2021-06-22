const jwt = require('jsonwebtoken');

const setUser = (req, res, next) => {
    const authHeader = req.get('authorization');

    if(authHeader) {
        const token = authHeader.split('')[1];

        if(token) {
            jwt.verify(token, prce)
        }
    }
}