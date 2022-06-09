const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const googleValidator = async (googleToken) => {
    const ticket = await client.verifyIdToken({
        idToken: googleToken,
        // Specify the CLIENT_ID of the app that accesses the backend
        audience: process.env.GOOGLE_CLIENT_ID,
    // Or, if multiple clients access the backend:
    // [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const { name, email } = ticket.getPayload();
    return { name, email };
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
};

module.exports = googleValidator;
