const express = require('express');
const app = express();
const port = 3000;
const normalTxn = require('./api/normal_txn');

app.use('/api/normal_txn', normalTxn);



app.listen(port, () => console.log(`Example app listening on port ${port}!`));