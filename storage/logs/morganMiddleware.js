// storage/logs/morganMiddleware.js
const morgan = require('morgan');
const logger = require('./logger');

const morganMiddleware = morgan(
    ':remote-addr :method :url :status :response-time ms - :res[content-length]',
    {
        stream: logger.stream,
        skip: (req, res) => res.statusCode < 400 // Only log errors
    }
);

module.exports = morganMiddleware;