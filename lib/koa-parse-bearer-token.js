let jwt = require('jsonwebtoken');
function* parseBearerToken(next) {
    let secret = this.CONFIGURATION.secret;
    try {
        var token = this.request.header.authorization.split(' ')[1];
        var verified = yield jwtVerifyPromise(token, secret);
    } catch (e) {
        this.throw(403, 'invalid token');
    }
    this.state.token = verified;
    yield next;
}

function jwtVerifyPromise(token, secret) {
    return new Promise(function (resolve, reject) {
        jwt.verify(token, secret, function (err, decoded) {
            if (err || !decoded) {
                reject(false);
            } else {
                resolve(decoded);
            }
        });
    });
}

module.exports = parseBearerToken;