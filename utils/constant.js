exports.statusMsg = {
    200: "Success",
    201: "Created",
    202: "Accepted",
    204: "No Content",
    400: "Bad Request", // request invalid format
    401: "Unauthorized", // belum login atau token invalid
    403: "Forbidden", // sudah login tapi tidak punya akses
    404: "Not Found", // resource tidak ditemukan
    405: "Method Not Allowed",
    409: "Conflict", // data bentrok, contoh: email sudah terdaftar
    410: "Gone", // resource sudah tidak tersedia
    415: "Unsupported Media Type",
    422: "Unprocessable Entity", // validation error
    429: "Too Many Requests", // rate limit
    500: "Internal Server Error", // error di server
    502: "Bad Gateway", 
    503: "Service Unavailable",
    504: "Gateway Timeout"
}
exports.statusExp = "expired"