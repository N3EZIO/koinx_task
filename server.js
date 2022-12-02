const express = require('express');
const app = express();
const port = 3000;
const normalTxn = require('./api/normal_txn');
const mongoose = require('mongoose');
const config = require('./config');
app.use('/api/normal_txn', normalTxn);

mongoose.connect(`${config.dbURI}`, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log('connected to db');
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));

});
