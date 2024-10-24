const Account = require('../models/account');

exports.getAccounts = async (req, res) => {
    return Account.find({})
}

exports.getAccounts = async (skip, limit) => {
    return Account.find().skip(skip).limit(limit)
}

exports.findById = async (id) => {
    return Account.findById({_id: id}).exec()
}

exports.createAccount = async (accountData) => {
    const newAccount = new Account(accountData)
    return  newAccount.save()
}

exports.updateAccount = async (data) => {
    const user = await Account.update(data)
    return user.save();
}

exports.HardDeleteAccount = async (req, res) => {
    const user = await Account.findById(req.params.id)
    await user.deleteOne()
}