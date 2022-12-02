const express = require('express');
const axios = require('axios');
const Router = express.Router();
const config = require('../config');
const User = require('../models/transactions');

Router.get('/:address', async (req, res) => {
    const address = req.params.address;
    try{
        const user = await User.findOne({address: address});
        if(user){
            //return all the txn records from the db if it already exists
            res.json(user.transactions);
        }else{
            //send a get request to the blockchain api and insert the data into the database

            const response = axios.get('https://api.etherscan.io/api',{
                params: {
                    module: 'account',
                    action: 'txlist',
                    address: address,
                    startblock: 0,
                    endblock: 99999999,
                    sort: 'asc',
                    apikey: config.apiKey
                }
            })

            const transactions = response.data.result;

            const user = new User({
                address: address,
                transactions: transactions
            });

        }
    }
    catch(err){
        res.status(500).json({
            message: err.message
        });
    }


});
