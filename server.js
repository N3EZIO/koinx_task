const express = require('express');
const app = express();
const port = 1337;
const normalTxn = require('./api/normal_txn');
const mongoose = require('mongoose');
const config = require('./config');
const Price = require('./models/price');
const getBalance = require('./api/get_balance');
const getEthPrice = require('./getEthPrice');

app.use(express.json());
app.use('/api/get_balance', getBalance);
app.use('/api/normal_txn', normalTxn);

//task-3 making a request every 10 mins to update price of ethereum
setInterval(getEthPrice, 600000);


mongoose.connect(`${config.dbURI}`, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log('connected to db');
    app.listen(port, () => console.log(`listening on port ${port}!`));
    getEthPrice();

});
