const getBalance = async (address) => {
    const response = await axios.get('https://api.etherscan.io/api', {
        params: {
            module: 'account',
            action: 'balance',
            address: address,
            tag: 'latest',
            apikey: config.apiKey
        }
    });
    return response.data.result;
}
