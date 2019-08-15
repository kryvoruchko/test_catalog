const config = require('../config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;

module.exports = {
    login,
    getById,
    createUser
};

async function login({ username, password }) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {
            success: true,
            token: token
        };
    }
}

async function createUser(userParam) {
    const username = userParam.username;
    const password = userParam.password;
    if (!username && !password) {
        throw 'Please fill in all fields';
    }

    if (!username) {
        throw 'Username is required';
    } else if (await User.findOne({ username: username })) {
        throw 'Username ' + username + ' is already taken';
    }

    if (!password) {
        throw 'Password is required';
    } else if (password.length < 6) {
        throw 'Password most be minimum 6 letters';
    }

    const user = new User(userParam);
    user.hash = bcrypt.hashSync(password, 10);

    await user.save();

    return login({ username, password });
}

async function getById(id) {
    return await User.findById(id).select('-hash');
}