const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const enforce = require('express-sslify');
const cron = require('cron').CronJob;
const seedDB = require('./config/seed');
const ip = process.env.IP;
const environment = process.env.NODE_ENV || 'dev';

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (environment == 'dev') {
    require('dotenv').config();
    // Simulate loading
    const slowness = process.env.SLOWNESS || 0;
    let loadTime = slowness * 1000 * Math.random();
    app.use((req, res, next) => {
        setTimeout(() => {
            loadTime = slowness * 1000 * Math.random();
            console.log('loaded');
            next();
        }, loadTime);
    });
    app.get('/', (req, res) => {
        res.send('This page shows in dev mode only');
    });
}

if (environment !== 'dev') {
    app.use(enforce.HTTPS({ trustProtoHeader: true }));
    app.use(express.static(path.join('client', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(port, ip, () => {
    console.log(`Server running on port ${port}...`);
});
