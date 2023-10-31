const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')


//@description: Register new user
// @route : POST /api/user/register
// @access : public

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.status(400).json({ error: 'Please add all fields' });
            return; // Return early to prevent further execution
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400).json({ error: 'User already exists' });
            return; // Return early to prevent further execution
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        if (user) {
            res.status(201).json({
                name: user.name,
                email: user.email,
                _id: user._id,
                token: generateToken(user._id)
            });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(500).json({ error: 'Internal Server Error' }); // Send a 500 Internal Server Error response
    }
};


//@description: authenticate a user
// @route : POST /api/user/login
// @access : public

const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                token: generateToken(user._id)
            })
        } else {
            res.json({"error":"invalid credentials"})
        }
    } catch (error) {
        res.json({ "error": "some thing went wrong" })
    }
}



// Generate JWT

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser, loginUser
}