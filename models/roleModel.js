const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    permission: [{
        type: Schema.Types.ObjectId,
        ref: 'Permissions',
    }]
});

module.exports = mongoose.model('Role', roleSchema);