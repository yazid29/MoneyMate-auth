const accountService = require('../services/accountService');
const {errorResponse, successResponse} = require('../utils/responseHandler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// exports.getUsers = async (req, res) => {
//     try {
//         const page = req.body.page || 1;
//         const limit = req.body.limit || 1;
//         const filter = req.body.filters;
//         const [result, count] = await accountService.getAllUsers(page,limit,filter);
//         if(result == 0){
//             return errorResponse(res, 404, 'Data not found');
//         }
//         return successResponse(res, 200, `Data Found ${count}`,result);
//     } catch (error) {
//         return errorResponse(res, 500, "Something went wrong", error.message);
//     }
// }
// exports.insertUser = async (req, res,next) => {
//     try {
//         const body = req.body;
//         try {
//             const data = await accountService.insertUser(body);
//             if(data == 1) return successResponse(res, 200, 'Create Data Success');
//         } catch (error) {
//             return errorResponse(res, error.code? error.code:500, error.errmsg, error);
//         }
//     } catch (error) {
//         return errorResponse(res, 500, "Something went wrong",error.message);
//     }
// }
exports.getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const resultUser = await accountService.getUserById(id);
        if(resultUser == 0){
            return errorResponse(res, 404, 'Data not found');
        }
        return successResponse(res, 200, `Data Found`,resultUser);
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error.message);
    }
}
exports.getUserByUsername = async (req, res) => {
    try {
        const userName = req.params.username;
        const resultUser = await accountService.getUserByUsername(userName);
        if(resultUser == 0){
            return errorResponse(res, 404, 'Data not found');
        }
        return successResponse(res, 200, `Data Found`,resultUser);
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error.message);
    }
}
exports.updateUserById = async (req, res) => {
    try {
        const id = req.body.id;
        const updateData = req.body.data;
        try {
            const data = await accountService.updateUserById(id, updateData);
            if(data == 1) return successResponse(res, 200, 'Update Data Success');
        } catch (error) {
            return errorResponse(res, error.code? error.code:500, error.errmsg, error);
        }
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong",error.message);
    }
}
exports.deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        try {
            const data = await accountService.deleteUserById(id);
            if(data == 1) return successResponse(res, 200, 'Delete Data Success');
        } catch (error) {
            return errorResponse(res, error.code? error.code:500, error.errmsg, error);
        }
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong",error.message);
    }
}
exports.softDeleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        try {
            const data = await accountService.softDeleteUserById(id);
            if(data == 1) return successResponse(res, 200, 'Delete Data Success');
        } catch (error) {
            return errorResponse(res, error.code? error.code:500, error.errmsg, error);
        }
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong",error.message);
    }
}
