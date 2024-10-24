const jwt = require('jsonwebtoken');
const path = require("node:path");
const secretKey = 'secret-Key';
const User = require('../models/userModel');
const user  = require('../repositories/authRepository');


const authenticateToken = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({message:"Token missing"});
    }
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({message:"Token valid"});
        }
        req.user = user;
        next();
    })
}
const checkPermission = async (req, res, next) => {
    try{
        const userID = req.user.id;
        const user = await User.findById(userID).populate({
                path : 'role',
                populate: {
                    path: 'Permissions',
                }
            }
        );
        if (!user) {
            return res.status(401).json({message:"Tài khoản không tồn tại"});
        }
        const userPermission = user.role.reduce((acc, role)=>{
            role.permissions.forEach(permission =>{
                acc.push({url :permission, method:permission.method});
            });
            return acc;
        }, []);
        const hasPermission = userPermission.some(p =>p.url ===req.path && p.method === req.method);
        if (!hasPermission) {
            console.log('Không có quyền truy cập')
        }
        next();
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    checkPermission,
    authenticateToken,
}
