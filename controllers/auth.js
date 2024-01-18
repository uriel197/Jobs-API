const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const register = async (req, res) => {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    // console.log({ StatusCodes });            /* 1 */
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
}

const login = async (req, res) => {
    const { password, email } = req.body;
    if(!password || !email) {
        throw new BadRequestError('Please fill out all fields');
    };
    const user = await User.findOne({ email });
    if(!user) {
        throw new UnauthenticatedError('Invalid Credentials');
    };
    const isPasswordCorrect = await user.matchPasswords(password);
    if(!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials');
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: {name: user.name}, token});
}

module.exports = {
    register,
    login,
}

/************** COMMENTS **************

*** 1: this prints a list of all the status codes and their respective names, and the names are all listed in uppercase which is why we use "CREATED" OR "BAD_REQUEST", ETC... example of console.log({StatusCodes}):
StatusCodes: {
    '100': 'CONTINUE',
    '101': 'SWITCHING_PROTOCOLS',
    '102': 'PROCESSING',
    '103': 'EARLY_HINTS',
    '200': 'OK',
    '201': 'CREATED',

*/