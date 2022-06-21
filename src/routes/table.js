const { Router } = require('express');
const { check } = require('express-validator');

const { session, existTable } = require('../middlewares');
const { postTable, getTables, deleteT } = require('../controllers/table');

const router = Router();

router.post('/', [
    session,
    check('number', 'The number of the table is required.').not().isEmpty(),
    existTable,
], postTable);

router.get('/', [
    session,
], getTables);

router.delete('/', [
    session,
    check('number', 'The number of the table is required.'),
], deleteT);

module.exports = router;
