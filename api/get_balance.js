const getBalance = async (transactions, address) => {
    
    let balance = 0;
    for(let i=0; i<transactions.length; i++){
        const value = transactions[i].value / 1000000000000000000; //convert wei to ether
        if(transactions[i].from === address){
            balance -= value;
        }
        if(transactions[i].to === address){
            balance += value;
        }
    }

    return balance;

}

const express = require('express');
const axios = require('axios');
const Router = express.Router();
const config = require('../config');
const User = require('../models/transactions');
const Price = require('../models/price');

Router.get('/:address', async (req, res) => {
    const address = req.params.address;

    const price = await Price.findOne({});
    //check if address is valid hexademical
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        return res.status(400).json({message: 'Invalid address'});
    }
    try{
        //get transactions from db using address
        const user = await User.findOne({address: address});
        if(user){
            const transactions = user.transactions;
            const balance = await getBalance(transactions, address);
            res.status(200).json({balance: balance, price: price.price});
        }else{
            //send a get request to the blockchain api and insert the data into the database
            const response = await axios.get('https://api.etherscan.io/api',{
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
            const balance = await getBalance(transactions, address);
            res.status(200).json({balance: balance, price: price.price});
            const user = new User({
                address: address,
                transactions: transactions
            });
            await user.save();
        }

    }catch(err){
        res.status(500).json({
            message: "Server error"
        });
    }
        
})


module.exports = Router;