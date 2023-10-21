const mognoose = require('mongoose');
const Schema = mognoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: false},
});

const User = mognoose.model('User', UserSchema);
module.exports = User;