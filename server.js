const express = require('express');
const cors = require('cors');
const mongodb = require('./data/database');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});
app.use('/', require('./routes'));

process.on('Uncaought exception', (err, origin) => {
    console.error(process.stderr.fd, 'There was an uncaught error:', err + 'Origin:', origin);
});

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Database is running on port ${port}`);
        });
    }
});