const { Router } = require('express');
const { check } = require('express-validator');

const { googleLogin } = require('../controllers/auth');

const router = Router();

router.post('/glogin', [
    check('googleToken', 'The googleToken is required')
        .not()
        .isEmpty(),
], googleLogin);

module.exports = router;
