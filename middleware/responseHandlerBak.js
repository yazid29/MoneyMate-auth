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

function error2(err, req, res, next) {
    let statusCode = err.statusCode || 500;
    let customMessage = statusMsg[statusCode];
    let errors = err.message;

    let errorMsg = `${req.method}\t${req.url}\t${err.statusCode}\t${err.message}`;
    
    logEvents(errorMsg, 'errLog.log');
    if (err.stack) {
        logEvents(`Stack: ${err.stack}`, 'errLog.log');
    }
    // if (err.name === 'ValidationError') {
    //     statusCode = 400;
    //     customMessage = "Input validation failed.";
    //     errors = err.details ? err.details.map(detail => ({
    //         field: detail.path,
    //         message: detail.message,
    //         code: 'VALIDATION_ERROR'
    //     })) : [{ message: err.message }];
    // } else if (err.name === 'UnauthorizedError' || statusCode === 401) {
    //     statusCode = 401;
    //     customMessage = "Authentication required.";
    //     errors.push({ message: err.message || "Invalid credentials or token expired.", code: 'UNAUTHORIZED' });
    // } else if (err.name === 'NotFoundError' || statusCode === 404) {
    //     statusCode = 404;
    //     customMessage = err.message || "Resource not found.";
    //     errors.push({ message: err.message || "Resource not found.", code: 'NOT_FOUND' });
    // } else {
    //     errors.push({ message: "Internal server error." });
    //     console.error("Internal Server Error:", err); 
    // }

    return res.status(statusCode).json({
        code: statusCode,
        status: "error",
        message: customMessage,
        errors: errors,
        metadata: {
            timestamp: new Date().toISOString(),
            trace_id: req.headers['x-request-id'] || 'N/A'
        }
    });
}

function success(data,res,statusCode, metadata = {}) {
    return res.status(statusCode).json({
        code: statusCode,
        status: statusMsg[statusCode],
        message: message,
        data: data,
        metadata: { ...metadata, timestamp: new Date().toISOString() }
    });
}

