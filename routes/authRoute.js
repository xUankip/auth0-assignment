const express = require('express');
const router = express.Router();
const {login, register} = require('../repositories/authRepository');
const {authenticateToken, checkPermission} = require('../middleware/authMiddleware');

router.get('/login', (req, res) => {
    res.render('auth/login.ejs');
});
router.get('/register', (req, res) => {
    res.render('auth/register.ejs');
});

router.post('/login', login);
router.post('/register', register);

router.get('/admin', authenticateToken, checkPermission, (req, res) => {
    res.send('Chào mừng đến trang quản trị');
});

module.exports = router;