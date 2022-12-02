const Price = require('./models/price');
const axios = require('axios');

module.exports = async () => {

    try{
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr')


        // match all numbers from a given string
        const regex = /\d+/g;
        const price = await response.data.match(regex)[0];
        console.log(price);

        const priceExists = await Price.findOne({price: price});
        if(priceExists){
            Price
            .findOneAndUpdate
            ({
                price: price
            }, {new: true}, (err, doc) => {
                if(err){
                    console.log(err);
                }
                console.log(doc);
            }
            )
        }else{
            const price1 = new Price({
                price: price
            });
            price1.save();
        }
        }catch(err){
            console.log(err);
        }
    
}