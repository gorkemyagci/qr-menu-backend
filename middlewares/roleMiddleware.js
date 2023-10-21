const User = require('../models/User');

module.exports = (roles) => {
    return async (req, res, next) => {
        try {
            const user = await User.findOne({ username: 'admin' });
            console.log(user);
            if (!roles.includes(user.role)) {
                return res.status(403).json({ message: 'Unauthorized' });
            }
            next();
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}