var express = require('express');
var router = express.Router();
const accountApi = require('../api/accountApi');

/* GET accounts listing. */
router.get('/', async function(req, res, next) {
    await accountApi.getAccounts(req, res);
});

router.get('/:id', async function(req, res, next) {
    await accountApi.getAccountDetail(req, res);
});

router.post('/', async function(req, res, next) {
    await accountApi.storeAccount(req, res);
});

router.delete('/:id', async function(req, res, next) {
    await accountApi.deleteAccount(req, res);
});

module.exports = router;
