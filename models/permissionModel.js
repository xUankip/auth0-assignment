const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const permissionSchema = new Schema({
    name : String,
    url : String,
    method: String,
})

module.exports = mongoose.model('Permissions', permissionSchema);