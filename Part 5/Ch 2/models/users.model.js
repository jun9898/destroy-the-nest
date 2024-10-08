const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        trim:  true,
        unique: true,
    },
    password: {
        type: String,
        minLength: 5
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    }
});


userSchema.methods.comparePassword = function (plainPassword, cb) {
    if (plainPassword === this.password) {
        cb(null, true);
    } else {
        cb(null, false);
    }
    return cb({ error: "error" });

    // bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
    //     if (err) return cb(err);
    //     cb(null, isMatch);
    // });
}

const User = mongoose.model("User", userSchema);

module.exports = User;