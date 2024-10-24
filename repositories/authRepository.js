const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Role = require('../models/roleModel');
const secretKey = 'secret-Key';

const saltRounds = 10;

exports.register = async (req, res) => {
    try{
        const { username, email, password, role } = req.body;
        const checkUser = await User.findOne({email});
        if (checkUser) {
            return res.render('auth/register.ejs', {message: 'Email đã tồn tại'})
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const userRole = await Role.find({name: {$in : role}})

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: userRole.map(role => role._id),
        });
        await newUser.save();
        return res.render('auth/register.ejs', { message: 'Đăng ký thành công' });
    }catch (err){
        return res.render('auth/register.ejs', { message: 'Đã có lỗi xảy ra vui lòng đăng kí lại' });
    }
};
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).populate('role');
        if (!user) {
            return res.render('auth/login.ejs', { message: 'Tài khoản không tồn tại' });
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.render('auth/login.ejs', { message: 'Sai mật khẩu' });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, secretKey, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
        return res.render('auth/login.ejs', { message: 'Đăng nhập thành công' });
    } catch (err) {
        console.log(err);
        return res.render('auth/login.ejs', { message: 'Đã có lỗi xảy ra, vui lòng thử lại' });
    }
};