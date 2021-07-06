const express = require('express');
const bycrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();


// @route GET /auth
// @description get auth user data
// @acess private
router.get('/', (req, res, next) => {
    if(!req.get('authorization')){
        res.status(401);
        const error = new Error('Credenciales invalidas');
        next(error);
    }else {
        res.status(200);
        res.json({
            user: req.user,
        });
    }
});

// @route post /auth
// @description authenticate a user and get token
// @access public
router.post('/', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if(!user) {
            res.status(400);
            throw new Error(
                'Nombre de usuario y/o password incorrectos, intenta nuevamente',
            );
        }

        const isMatch = await bycrpt.compare(password, user.password);
        if(!isMatch) {
            res.status(400);
            throw new Error(
                'Nombre de usuario y/o password incorrectos, intenta nuevamente',
            );
        }

        const payload = {
            id: user._id,
            name: `${user.name.nickName} ${user.name.firstName} ${user.name.lastName}`,
            email: user.email,
            role: user.role,
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: '1d',
            },
            (error, token) => {
                if (error) {
                    res.status(400);
                    throw new Error(
                        'Nombre de usuario y/o password, intenta nuevamente',
                    );
                }else {
                    res.status(201);
                    res.json({ token });
                }
            },
        );

    } catch (error) {
            next(error);
    }
});

module.exports = router;
