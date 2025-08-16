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
            return {status: 0,message: error.message};
        }
    }
}

module.exports = new accountModel();