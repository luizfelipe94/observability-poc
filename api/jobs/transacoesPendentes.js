const { v4: uuid } = require('uuid');
const logger = require('../logger');

const jobName = 'transacoes-pendentes';

const executionId = uuid();
logger.info('executando transacoes pendentes', { executionId, jobName });

for (let i = 0; i < 20; i++) {
    const transactionId = uuid();
    logger.info('transacao concluida', { transactionId, jobName })
}

for (let i = 0; i < 3; i++) {
    const transactionId = uuid();
    try {
        throw new Error('Invalid transaction');
    } catch (error) {
        logger.error(error, { transactionId, jobName })
    }
}