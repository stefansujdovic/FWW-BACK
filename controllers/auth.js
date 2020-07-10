const User = require('../models/user');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { errorHandler } = require('../helpers/ErrorHandler');


exports.registration = async (req, res) => {
    const user = new User(req.body);
    await user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            user
        })
    })

}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth'
})

exports.login = async (req, res) => {
    const { username, password } = req.body;
    await User.findOne({ username }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'You enter wrong UserName or password'
            })
        }

        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Username and password are not same!'
            })
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)

        res.cookie('t', token, { expire: new Date() + 9999 })
        const { _id, username } = user;
        return res.json({ token, user: { _id, username } })
    })
}

exports.authenticate = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).json({
            error: 'Fodbiden access'
        })
    }
    next();
}


exports.logout = (req, res) => {
    res.clearCookie('t');
    res.json({
        message: 'Log out success'
    })
}


exports.userId = async (req, res, next, id) => {
    console.log('ulazis li ?')
    await User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            })
        }
        req.profile = user;
        next();
    })
}