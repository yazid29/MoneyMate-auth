const pool = require("../config/db");

class refreshTokenModel {
    saveToken = async (userId, token) => {
        const saveTokenData = await pool('tb_refresh_tokens').insert({
            user_id: userId,
            access_token: token.access_token,
            refresh_token: token.refresh_token,
            created_at:token.created_at
        }).returning(['id']);
        return saveTokenData;
        
    };
    deleteAllUserTokens = async (userId) => {
        return pool('tb_refresh_tokens').where('user_id', userId).del();
    };

    findToken = async (token) => {
        return pool('tb_refresh_tokens').where('refresh_token', token).first();
    };
}

module.exports = new refreshTokenModel();