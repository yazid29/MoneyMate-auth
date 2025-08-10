const { statusMsg } = require('../utils/constant');
exports.successResponse = (res, statusCode, message, data = undefined) => {
    return res.status(statusCode).json({
        code: statusCode,
        status: statusMsg[statusCode],
        message: message,
        data: data
    })
}

exports.errorResponse = (res, statusCode, message, detailError = undefined) => {
    console.log("errorResponse", statusCode, message, detailError);
    return res.status(statusCode).json({
        code: statusCode,
        status: statusMsg[statusCode],
        message: (statusCode == 500)? "Something went wrong" : message,
        errorDetails: detailError
    })
}

exports.customResponse = (res, statusCode, message, detail) => {
    return res.status(statusCode).json({
        status: statusMsg[statusCode],
        message: message,
        messageDetails: detail
    })
}