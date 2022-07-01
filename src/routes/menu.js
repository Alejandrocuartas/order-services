const { Router } = require('express');
const { check } = require('express-validator');

const { session, existProduct } = require('../middlewares');
const {
    postMenu,
    deleteMenu,
    postProduct,
    deleteProduct,
    patchProduct,
    getMenu,
} = require('../controllers/menu');

const router = Router();

router.get('/', [
    session,
], getMenu);

router.post('/', [
    session,
], postMenu);

router.delete('/', [
    session,
], deleteMenu);

router.post('/product', [
    session,
], postProduct);

router.delete('/product/:id', [
    session,
    check('id', 'The id of the product is required').not().isEmpty(),
    check('id', 'The id must be a MongoDB id.').isMongoId(),
    existProduct,
], deleteProduct);

router.patch('/product/:id', [
    session,
    check('id', 'The id of the product is required').not().isEmpty(),
    check('id', 'The id must be a MongoDB id.').isMongoId(),
    existProduct,
    check('newPrice', 'The new price is required').not().isEmpty(),
    check('newPrice', 'The new price must be a number').isNumeric(),
], patchProduct);

module.exports = router;
