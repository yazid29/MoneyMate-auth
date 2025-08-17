const pool = require("../config/db");

class accountModel {
    insertData = async (data) => {
        try {
            const userAccount = await pool('tb_users').insert({
                username:data.username,
                email:data.email,
                password:data.password,
                is_active:true,
                created_at: data.createdAt
            }).returning(['id', 'email']);
            return {status: 1,data: userAccount};
        } catch (error) {
            throw error;
        }
    }
    checkExistingUser = async (username, email) => {
        try {
            const user = await pool('tb_users')
                .where({ username: username })
                .orWhere({ email: email })
                .first();
            return user;
        } catch (error) {
            throw error;
        }
    };
    getUserByUsername = async (username) => {
        try {
            const user = await pool('tb_users')
                .where({ username: username })
                .first();
            return user;
        } catch (error) {
            throw error;
        }
    };
    updateByUsername = async (username,updateData) => {
        try {
            const user = await pool('tb_users')
                .where({ username: username })
                .update(updateData);
            return user;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new accountModel();