const express = require('express');
const app = express();
const promMid = require('express-prometheus-middleware');

const logger = require('./logger');

app.use(promMid({
    metricsPath: '/metrics',
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
    requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
    responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
}));

app.get("/ok", (req,res) => {
    logger.info('rota info', { ['req-id']: req.headers['red-id'] });
    return res.status(200).json({ foo: 'ok' });
});
app.get("/error", (req,res) => {
    logger.error(new Error('Rota error'), { ['req-id']: req.headers['red-id'] });
    res.status(500).json({ foo: 'error' });
});
app.get("/bad", (req,res) => {
    logger.warn('rota bad', { ['req-id']: req.headers['red-id'] });
    res.status(400).json({ foo: 'bad' });
});

app.listen(3005, function () {    
    console.log('Listening');  
});