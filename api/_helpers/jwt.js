const expressJwt = require('express-jwt');
const config = require('config.json');
const authService = require('../services/auth.service');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            '/auth/signIn',
            '/auth/signUp',
            '/docs/'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await authService.getById(payload.sub);

    if (!user) {
        return done(null, true);
    }

    done();
}
