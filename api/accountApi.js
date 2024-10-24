const Account = require('../models/account');
const accountService = require('../servicies/accountService');

exports.getAccounts = async (req, res) => {
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const startIndex = (page - 1) * limit;
        const total = await Account.countDocuments();
        const accounts = await accountService.getAllAccounts(startIndex, limit);
        res.json({
            page,
            limit,
            total,
            pages : Math.ceil(total / limit),
            data: accounts
        });
    } catch (err){
        console.error(err);
        res.status(500).send('Error getting accounts');
    }
}

exports.getAccountDetail = async (req, res) => {
    try{
        const account = await accountService.getDetail(req.params.id);
        res.json({
            data: account
        })
    }catch (err){
        res.status(404).send('Error getting account detail');
    }
}
exports.storeAccount = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const account = await accountService.createAccount({ username, email, password });
        res.json({
            data: account
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}
exports.deleteAccount = async (req, res) => {
    try {
        await accountService.deleteAccount(req.params.id);
        res.json({
            message: 'Delete success'
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}