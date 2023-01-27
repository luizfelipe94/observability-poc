const { v4: uuid } = require('uuid');
const logger = require('../logger');

const jobName = 'renovacao-cesta';

const executionId = uuid();
logger.info('executando renovacao de cesta', { executionId, jobName });

for (let i = 0; i < 20; i++) {
    const transactionId = uuid();
    logger.info('renovacao concluida', { transactionId, jobName })
}

for (let i = 0; i < 3; i++) {
    const transactionId = uuid();
    try {
        throw new Error('Invalid input');
    } catch (error) {
        logger.error(error, { transactionId, jobName })
    }
}