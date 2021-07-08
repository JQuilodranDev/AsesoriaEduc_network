const express = require('express');
const bycrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('config');
const { check, validationResult } = require('express-validator');

const router = express.Router();


// @route GET /auth
// @description get auth user data
// @acess private
router.get('/', (req, res, next) => {
    if(!req.get('x-auth-token')){
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
// @access private
router.post('/', [
    check('email', 'Porfavor ingresar un email valido')
    .isEmail(),
    check('password', 'La password es requerida')
    .exists()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body
    console.log(email);
    try {
        let user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({
                errors: [{ msg: 'Credenciales invalidas'}]
            });
        }

        const isMatch = await bycrpt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({
                errors: [{ msg: 'Credenciales invalidas'}]
            });
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (error, token) => {
            if(error) throw error;
            res.json({ token });
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;
