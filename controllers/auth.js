const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    const user = await User.create({ ...req.body });
    // console.log({ StatusCodes });            /* 1 */
    res.status(StatusCodes.CREATED).json({ user });
}

const login = async (req, res) => {
    res.send('login User');
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