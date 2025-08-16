const logger = require('../config/logger');
const UserAccount = require('../models/accountModel');
const accountModel = require('../models/accountModel');
const encryption = require('../utils/hashPassword');

exports.getAllUsers = async (page,limit,filter) => {
    try {
        const users = await pool('tb_user').select('*');
        return users;
    } catch (error) {
        throw error;
    }   
}