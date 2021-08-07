const express = require('express');
const jwt = require("jsonwebtoken");
const User = require("../model/user");

// errors handler
const handleErrors = (err) => {

    let errors = { email: '', password: '', name: ''};

    if (err.code == 11000) {
        errors.email = "Email is already exit";
    }

    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).map(({ properties }) => {
            errors[properties.path] = properties.message;
        })
    }

    if (err.message === "incorrect password" || err.message === "incorrect email") {
        errors.loginErr = "Email and Password is not correct !"
    }

    return errors;
}

// create token
const maxAge = 60 * 60 * 24;

const createToken = (id) => {
    return jwt.sign({ id }, 'node and express auth secret', {
        expiresIn: maxAge
    });
}

const indexRoute = (req, res, next) => {
    res.render('index');
}

const registerRoute = (req, res, next) => {
    res.render('register');
}

const registerAction = async (req, res, next) => {

    const { name, email, password} = req.body;

    const user = new User({ name, email, password});

    user.save()
        .then((result) => {
            const token = createToken(user._id);

            res.cookie('nodeAndExpressAuth', token, { httpOnly: true, maxAge: maxAge * 1000 });

            res.status(201).json({ user: user._id });
        })
        .catch(err => {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        })
}

const loginRoute = (req, res, next) => {
    res.render('login');
}

const loginAction = async (req, res, next) => {

    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);

        const token = createToken(user._id);

        res.cookie('nodeAndExpressAuth', token, { httpOnly: true, maxAge: maxAge * 1000 });

        res.status(201).json({ user: user._id });
    }
    catch (err) {

        console.log(err);

        const errors = handleErrors(err);

        res.status(422).json({ errors });

    }
}

const logoutAction = (req, res, next) => {

    res.cookie('nodeAndExpressAuth', '', { maxAge: 1 });

    res.redirect('/login');

}

module.exports = {
    indexRoute,
    registerRoute,
    registerAction,
    loginRoute,
    loginAction,
    logoutAction
}