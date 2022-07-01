const { Router } = require('express');
const { check } = require('express-validator');

const { googleLogin, deleteGLogin, getAuthData } = require('../controllers/auth');
const { session } = require('../middlewares');

const router = Router();

router.post('/glogin', [
    check('googleToken', 'The googleToken is required')
        .not()
        .isEmpty(),
], googleLogin);

router.delete('/glogin', [
    session,
], deleteGLogin);

router.get('/profile', [
    session,
], getAuthData);

module.exports = router;
