const jwt = require('jsonwebtoken');

const jwtGenerator = (id) => new Promise((resolve, reject) => {
    const payload = {
        id,
    };
    jwt.sign(payload, process.env.JWT_KEY, {
        expiresIn: '12h',
    }, (err, token) => {
        if (err) {
            reject(new Error('Could not generate token.'));
        } else {
            resolve(token);
        }
    });
});

module.exports = jwtGenerator;
