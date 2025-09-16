const { logEvents } = require('../utils/logger'); 
const { statusMsg } = require('../utils/constant');
function success(data,res,statusCode, detailMessage,metadata = {}) {
    return res.status(statusCode).json({
        code: statusCode,
        status: statusMsg[statusCode],
        message: detailMessage,
        data: data,
        metadata: { ...metadata, timestamp: new Date().toISOString() }
    });
}

// Middleware untuk respons error (dengan integrasi logging)
function error(errorMessage, req, res, code) {
    console.log('errorMessage.statusCode',code);
    
    let statusCode = code!=null? code : 500;
    let statusMessage = statusMsg[statusCode];
    let errors = errorMessage.message? errorMessage.message:errorMessage;

    let errorMsg = `${req.method}\t${req.url}\t`;
    if(errorMessage.message != undefined) {
        errorMsg = errorMsg+`${errorMessage.statusCode}\t${errorMessage.message}`;
    }else{
        errorMsg = errorMsg+`${errorMessage}`;
    }
    
    if (errorMessage.stack) {
        logEvents(`Stack: ${errorMessage.stack}`, 'errLog.log');
    }else{
        logEvents(errorMsg, 'errLog.log');
    }

    return res.status(statusCode).json({
        code: statusCode,
        status: "error",
        message: statusMessage,
        message_detail: errors,
        metadata: {
            timestamp: new Date().toISOString(),
            trace_id: req.headers['x-request-id'] || 'N/A'
        }
    });
}

module.exports = {
    successResponse: success,
    errorResponse: error
};