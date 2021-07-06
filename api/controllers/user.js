const express = require('express');
const router = express.Router();
const bycrpt = require('bcryptjs')
const User = require('../models/User');

// @route POST /controllers/users
// @description Create a new user
// @access private
router.post('/', async (req, res, next) => {
    try {       
        const {
            nickName,
            firstName,
            lastName,
            email,
            password,
            image,
            role,
        } = req.body;

        const user = await User.findOne({ email });

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
            image,
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


// @route GET /controllers/users
// @description Get All Users
// @access private

router.get('/', async (req, res) => {
    try {
        const allUsers = await User.find({}, '-password');
        if(!allUsers){
            res.status(400);
            throw new Error('No hay registros que mostrar');
        }
        res.json(allUsers);
    } catch (error) {
        next(error);
    }
});

// @route DELETE /controllers/users/:id
// @description Delete User By Id
// @access private
router.delete('/:id', async(req, res, next) => {
    try{
    const user = await User.findOneAndDelete({ _id: req.params.id });

    if(!user){
        res.status(400);
        throw new Error('Ha ocurrido un error.' + user);
    }

    res.json({ id: user._id });
    } catch(error){
        next(error);
    }
});


// @route PATCH /controllers/users/id
// @description Update user's password
// @access private
// -Refactor return value, return only deleted users ID to remove from view
router.patch('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findOne(id);

        if(!user) {
            res.status(400);
            throw new Error('El usuario no aparece en el registro');
        }

        if(req.body.password) {
            const hashedPassword = await bycrpt.hash(req.body.password.trim(), 10);
            req.body.password = hashedPassword;
        }

        const updatedUser = await User.findByIdAndUpdate(id, {
            $set: red.body,
        });

        delete updatedUser.password;
        res.json(updatedUser);
    }catch(error) {
        next(error);
    }
});


// @route POST /controllers/users/id

router.post('/:id', async (req, res) => {
     const id = req.params.id;
    
     if(req.files) {
         const file_path = req.files.image.path;
         console.log(file_path);
         const file_split = file_path.split('\\');
     }

})



module.exports = router;
