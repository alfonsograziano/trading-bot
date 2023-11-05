const Alpaca = require("@alpacahq/alpaca-trade-api");
const options = {
  keyId: process.env.API_KEY,
  secretKey: process.env.API_SECRET,
  paper: true,
};
const alpaca = new Alpaca(options);
module.exports = alpaca;
