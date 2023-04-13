const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = 'quuqiajdaldkdalak';

async function register(email,username, password) {
    const existing = await User.findOne({ email }).collation({ locale: 'en', strength: 2 })
    if (existing) {
        throw new Error('Email is taken!');
    }
    const existingUsername = await User.findOne({ username }).collation({ locale: 'en', strength: 2 })
    if (existingUsername) {
        throw new Error('Email is taken!');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ email,username, hashedPassword });

    //TODO see assiment if register save jwt and session 
    const token = createSession(user);
    return token;
}

async function login(email, password) {
    const existing = await User.findOne({ email }).collation({ locale: 'en', strength: 2 })
    console.log(user);
    if (!existing) {
        throw new Error('Email and password is wrong!');
    }

    let hasMatch = bcrypt.compare(password, existing.hashedPassword)
    if (hasMatch == false) {
        throw new Error('Username and password is wrong!');
    }
    let token = createSession(existing.hashedPassword)

    return token;
}

function createSession({ _id,email, username }) {
    const payload = {
        _id,
        email,
        username
    }

    const token = jwt.sign(payload, JWT_SECRET);
    return token;
}

function verifyToken(token) {
    let jwtSucces = jwt.verify(token, JWT_SECRET)
    return jwtSucces;
}

async function logout() {

}

module.exports = { register, login, verifyToken }