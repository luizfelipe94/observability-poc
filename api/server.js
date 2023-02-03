// require('./tracing')('poc123');
require('./tracing');
const express = require('express');
const { Axios } = require('axios');
const promMid = require('express-prometheus-middleware');
const logger = require('./logger');
const { MongoClient } = require('mongodb');

const app = express();

app.use(promMid({
    metricsPath: '/metrics',
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
    requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
    responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
}));

const axios = new Axios({ validateStatus: false });
let db;

app.get("/ok", async (req,res) => {
    logger.info('rota info log1');
    logger.info('rota info log2');
    const { data: d1 } = await axios.get("https://pokeapi.co/api/v2/pokemon/ditto");
    logger.info('rota info log3', { pokemonId: d1.id });
    const { data: d2 } = await axios.get("https://pokeapi.co/api/v2/pokemon/charizard");
    logger.info('rota info log4', { pokemonId: d2.id });
    await axios.get("https://pokeapi.co/api/v2/pokemon/bulbasaur3");
    logger.info('rota info log5', { pokemonId: 'not found'});
    const todos = await db.collection("todos").find({}).toArray();
    logger.info('mongo response');
    return res.status(200).json(todos);
});
app.get("/error", (req,res) => {
    logger.error(new Error('Rota error'));
    res.status(500).json({ foo: 'error' });
});
app.get("/bad", (req,res) => {
    logger.warn('rota bad');
    res.status(400).json({ foo: 'bad' });
});

// app.get("/dock/boleto", async (req,res) => {
//     logger.info('boleto gerado');
//     await new Promise(resolve => setTimeout(resolve, 1500));
//     return res.status(201).json({ message: 'boleto gerado' });
// });

function main () {
    MongoClient.connect("mongodb://192.168.1.10:27017", { auth: { username: 'root', password: 'MongoDB2023!' } })
    .then((client) => {
        db = client.db('todo')
        app.listen(3005, function () {    
            console.log('Listening');  
        });
    });
}

main();