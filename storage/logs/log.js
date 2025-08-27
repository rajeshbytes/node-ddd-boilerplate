// storage/logs/log.js
const logger = require('./logger');

class Log {
    static info(message, meta = {}) {
        logger.info(message, meta);
    }

    static error(message, meta = {}) {
        logger.error(message, meta);
    }

    static warn(message, meta = {}) {
        logger.warn(message, meta);
    }

    static debug(message, meta = {}) {
        logger.debug(message, meta);
    }

    static emergency(message, meta = {}) {
        logger.error(`EMERGENCY: ${message}`, meta);
    }

    static alert(message, meta = {}) {
        logger.error(`ALERT: ${message}`, meta);
    }

    static critical(message, meta = {}) {
        logger.error(`CRITICAL: ${message}`, meta);
    }

    static notice(message, meta = {}) {
        logger.notice(message, meta);
    }

    // Laravel-like channel method
    static channel(channel = 'application') {
        return {
            info: (message, meta) => logger.child({ channel }).info(message, meta),
            error: (message, meta) => logger.child({ channel }).error(message, meta),
            warn: (message, meta) => logger.child({ channel }).warn(message, meta),
            debug: (message, meta) => logger.child({ channel }).debug(message, meta),
        };
    }
}

module.exports = Log;