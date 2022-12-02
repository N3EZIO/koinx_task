const express = require('express');
const axios = require('axios');
const Router = express.Router();
const config = require('../config');
const User = require('../models/transactions');

Router.get('/:address', async (req, res) => {
    const address = req.params.address;
    try{
        
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
            res.json(transactions);
            const user = new User({
                address: address,
                transactions: transactions
            });


            //check if the user already exists in the database and update the transactions else insert the user
            const userExists = await User.findOne({address: address});
            if(userExists){
                user.findOneAndUpdate({address: address, transactions: transactions}, {new: true}, (err, doc) => {
                    if(err){
                        console.log(err);
                    }
                    console.log(doc);
                }
                )
            }else{
                user.save();
            }



    }
    catch(err){
        res.status(500).json({
            message: err.message
        });
    }


});
