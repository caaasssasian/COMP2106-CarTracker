// refs
const mongoose = require('mongoose');
const passport = require('passport');
const plm = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    phone: String
});

// use plm to automatically define username and password fields for this model
userSchema.plugin(plm);

// make public
module.exports = mongoose.model('User', userSchema);