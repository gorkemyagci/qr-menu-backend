const { createToken } = require('../core/tokenHelper');
const User = require('../models/User');
require('dotenv').config();


exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (user) {
            const same = user.password === password;
            if (same) {
                const data = {
                    accessToken: createToken({
                        id: user._id,
                        username: user.username,
                        role: user.role
                    }),
                }
                res.status(200).json({
                    message: 'User logged in successfully',
                    accessToken: data.accessToken,
                });
            } else {
                res.status(400).json({ message: 'Password is wrong' });
            }
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.logout = async (req, res) => {
    try {
        req.session.destroy();
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}