const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (errorMessage, logFileName) => {
  const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:ss");
  const logItem = `${dateTime}\t${errorMessage}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logFileName),
      logItem
    );
  } catch (err) {
    console.error('Error writing log:', err);
  }
};

const logger = (req, res, next) => {
  console.log(`${req.method}\t${req.url}\t${req.headers.origin}`);
  const currentDateTime = new Date().toISOString();
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "logEvents.log");
  if(!req.path.includes("css")) console.log(`${currentDateTime} ${req.method} ${req.path}`);
  next();
};

module.exports = { logEvents, logger };