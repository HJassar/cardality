const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const enforce = require('express-sslify');
const cron = require('cron').CronJob;

//Models declarations
const Card = require("./models/card");
const Story = require("./models/story");

//Routes declarations
const storiesRouter = require("./routes/stories");
const cardsRouter = require("./routes/cards");

app.use('/stories',storiesRouter);

// Config declarations
const port = process.env.PORT || 5000;
const ip = process.env.IP;
const environment = process.env.NODE_ENV || 'dev';
const db = process.env.DATABASEURL || "mongodb://localhost/cardality";
const seedDB = require('./config/seed');

//Body-Parser configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//DB connection
mongoose.connect(db, ({
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}))
    .then(() => { console.log("connected to" + db); })
    .catch(err => { console.log(err.message); });


// Special for Dev Environment
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

// Calling the seed function
seedDB();

app.listen(port, ip, () => {
    console.log(`Server running on port ${port}...`);
});
