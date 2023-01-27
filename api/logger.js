const winston = require('winston');
const { combine, timestamp, json, errors } = winston.format;

const logger = winston.createLogger({
    level: process.env.LOGGER_LEVEL || 'info',
    format: combine(errors({ stack: true }), timestamp(), json()),
    defaultMeta: { tenant: process.env.TENANT_NAME || 'tenant' },
    transports: [
        new winston.transports.Console()
    ]
});

module.exports = logger;