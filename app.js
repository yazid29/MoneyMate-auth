const dotenv = require('dotenv');
dotenv.config(); 
const express = require('express')
const app = express()
const http = require("http");
const path = require('path');
const { logger, logEvents } = require('./utils/logger');
const { successResponse, errorResponse } = require('./middleware/responseHandler');
const cookieParser = require('cookie-parser');
const port = process.env.port || 5050;
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const multer = require('multer');

app.use(multer().any());
app.use(logger);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//const logger = require('./config/logger'); //winston
//const {errorResponse} = require('./utils/responseHandler');

// list all router
const authentication = require('./routes/authenticationRoute');
// const userManagement = require('./routes/user_management');

app.use("/auth", authentication);
// app.use("/user/management", userManagement);
// Middleware if route API not found
app.use((req, res,next) => {
  const err = new Error('Resource not found.');
  err.statusCode = 404;
  next(err);
});
app.use(errorResponse);

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));