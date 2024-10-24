const accountRepository = require('../repositories/accountRepository');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// exports.getAllAccounts = () => {
//     return accountRepository.getAccounts();
// };

exports.getAllAccounts = (skip, limit) => {
    return accountRepository.getAccounts(skip, limit);
};

exports.getDetail = (id) => {
    return accountRepository.findById(id);
};

exports.createAccount = async (accountData) => {
    const existingAccount = await accountRepository.findAccountByUsername(accountData.username);
    if (existingAccount) {
        throw new Error('Username already exists');
    }
    accountData.passwordHash = await bcrypt.hashSync(accountData.password, saltRounds);
    return accountRepository.createAccount(accountData);
};

exports.deleteAccount = async () => {
    const existingAccount = await accountRepository.findById();
    if (!existingAccount) {
        throw new Error('Account is not found');
    }
    // change status: accountData.status = -1 //
    return accountRepository.HardDeleteAccount(existingAccount);
};
