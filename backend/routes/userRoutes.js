const express = require('express');
const User = require('../model/UserModel');
const router = express.Router();

const saveAuthDetails = async (name, email, password) => {
    try {
        const user = new User({
            name,
            email,
            password
        });

        await user.save();

        return user;
    } catch (error) {
        console.log(error);
    }
};
const generateOTP = () => {
    const otp = Math.floor(10000 + Math.random() * 90000).toString();
    return otp;
};
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Please provide username, email, and password' });
    }
    if (!(await User.findOne({ email: req.body.email }))) {
        try {
            const user = await User.create({
                username,
                email,
                password
            });

            await user.save();


            res.json({ ...user._doc, otp: generateOTP() });
        } catch (error) {
            console.log(error);
        }
    } else {
        res.status(200).json({ error: "email is allready taken." });
    }

});


router.post('/signin', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }
        if (req.body.password === user.password) {
            res.status(200).json(user);
        } else {
            res.status(200).json({ error: "password incorrect" });
        }
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
