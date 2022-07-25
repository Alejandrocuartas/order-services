const { Router } = require('express');
const { check } = require('express-validator');

const { session } = require('../middlewares');
const { postOrder, paidOrder, patchOrder } = require('../controllers/order');

const router = Router();

router.post('/', [
    check('companyId', 'The companyId is required').not().isEmpty(),
    check('companyId', 'The companyId is a MongoDB id').isMongoId(),
    check('table', 'The table of the order is required.').not().isEmpty(),
    check('products', 'The products of the order are required.').not().isEmpty(),
], postOrder);

router.delete('/', [
    session,
], paidOrder);

router.patch('/', [
    session,
    check('orderId', 'The orderId is required').not().isEmpty(),
], patchOrder);

module.exports = router;
