const UserModel = require('./models/users.model');
const _ = require('lodash');
const config = require('./config');
const bcrypt = require('bcryptjs');
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

/**
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function checkAuth(req, res, next) {
    passport.authenticate('jwt', {session: false}, (err, decryptToken, jwtError) => {
        if (jwtError != void(0) || err != void(0)) {
            res.locals.error = err || jwtError;
            res.render('home', {
                error: err || jwtError,
            });
            return;
        }
        req.user = decryptToken;
        next();
    })(req, res, next);
};

function createToken(body) {
    return jwt.sign(
        body,
        config.jwt.secretOrKey,
        {expiresIn: config.expiresIn}
    );
};

module.exports = (app) => {
    app.get('/', checkAuth, (req, res) => {
        res.render('home');
    });

    app.post('/login', async (req, res) => {
        try {
            let user = await UserModel.findOne({username: {$regex: _.escapeRegExp(req.body.username), $options: "i"}}).lean().exec();
            if (user != void(0) && bcrypt.compareSync(req.body.password, user.password)) {
                const token = createToken({id: user._id, username: user.username});
                res.cookie('token', token, {
                    httpOnly: true
                })
            } else {
                return res.status(400).send({message: 'User already exist or password not correct'});
            }

            res.status(200).send({message: 'User login succes'});
        } catch (e) {
            console.error(e);
            res.status(500).send({message: 'some error'});
        }
    });

    app.post('/register', async (req, res) => {
        try {
            let user = await UserModel.findOne({username:{$regex: _.escapeRegExp(req.body.username), $options: 'i'}}).lean().exec();
            if (user != void(0)) return res.status(400).send({message: 'User already exist'});

            user = await UserModel.create({
                username: req.body.username,
                password: req.body.password,
            });

            const token = createToken({id: user._id, username: user.username});

            res.cookie('token', token, {
                httpOnly: true
            })

            res.status(200).send({message: 'User created'});
        } catch (e) {
            console.error(e);
            res.status(500).send({message: 'some error'});
        }
    });

    app.post('/logout', (req, res) => {
        res.clearCookie('token');
        res.status(200).send({message: 'logout succes'});
    })
};
