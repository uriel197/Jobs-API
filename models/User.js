const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        minlength: 3,
        maxlength: 25,
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          'Please provide a valid email',
        ],
        unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      minlength: 6,
    },
});

UserSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})              /* 1 */

UserSchema.methods.createJWT = function() {
    return jwt.sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
};

UserSchema.methods.matchPasswords = async function(userPassword) {
    const goodMatch = await bcrypt.compare(userPassword, this.password);
    return goodMatch;
}

module.exports = mongoose.model('User', UserSchema);


/*********** COMMENTS *********** 

*** 1: model middleware hooks into static functions on a Model class,  In model middleware functions, "this" refers to the model. because we are using "async" we dont need the "next()" function.

*/