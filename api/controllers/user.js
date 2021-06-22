const express = require('express');
const router = express.Router();
const bycrpt = require('bcryptjs')
const User = require('../models/User');


router.post('/', async (req, res, next) => {
    try {
        const {
            nickName,
            firstName,
            lastName,
            email,
            password,
            role,
        } = req.body;

        const user = await User.findOne({ email});

        if (user) {
            res.status(400);
            throw new Error(
                'El nombre de usuario ya esta en uso, por favor escoje otro nombre de usuario',
            );
        }

        const hashedPassword = await bycrpt.hash(password.trim(), 10);

        const newUser = new User({
            name: {
                nickName,
                firstName,
                lastName,
            },
            email,
            password: hashedPassword,
            role: role ? role : 'student',
        });

        const insertedUser = await newUser.save();

        if(!insertedUser) {
            res.status(400);
            throw new Error('Ha ocurrido un error');
        }

        delete newUser.password;
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
});

