const jwt = require("jsonwebtoken");
const User = require("../model/user");

const requireAuth = (req, res, next) => {

    const token = req.cookies.nodeAndExpressAuth;

    if (token) {
        jwt.verify(token, 'node and express auth secret', (err, decodedToken) => {

            if (err) {
                res.redirect('/login');
            }
            else {
                next();
            }

        });
    }
    else {
        res.redirect('/login');
    }

};

const checkUser = (req, res, next) => {

    const token = req.cookies.nodeAndExpressAuth;

    if (token) {
        jwt.verify(token, 'node and express auth secret', async (err, decodedToken) => {

            if (err) {
                res.locals.user = null;
                next();
            }
            else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }

        });
    }
    else {
        res.locals.user = null;
        next();
    }

};

module.exports = { requireAuth, checkUser };