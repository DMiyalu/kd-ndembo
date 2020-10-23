const config = require('./config')
let configToUse = {};

if (process.env.NODE_ENV === 'production') configToUse = config.production;
else if (process.env.NODE_ENV === 'test') configToUse = config.test;
else configToUse = config.development;

module.exports = configToUse
