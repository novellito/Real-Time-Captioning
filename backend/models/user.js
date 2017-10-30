const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const UserSchema = mongoose.Schema({
    //fill in

});

const User = module.exports = mongoose.model('User', UserSchema);