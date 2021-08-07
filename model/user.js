const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is require !'],
        minLenght: [5, 'Please enter minimum 5 char !'],
        minLenght: [50, 'Please enter maximum 50 char !'],
    },
    email: {
        type: String,
        required: [true, 'Email is require !'],
        unique: true,
        validate: [isEmail, 'Email is invalid !'],
        minLenght: [11, 'Please enter minimum 11 char !'],
        minLenght: [100, 'Please enter maximum 100 char !'],
    },
    password: {
        type: String,
        required: [true, 'Password is require !'],
        minLenght: [8, 'Please enter minimum 8 char !'],
        minLenght: [30, 'Please enter maximum 30 char !'],
    }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function (email, password) {

    const user = await this.findOne({ email: email });

    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}

const User = mongoose.model('User', userSchema);

module.exports = User;