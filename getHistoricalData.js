const alpaca = require("./alpaca");

async function getHistoricalData(symbol, options) {
  let bars = [];
  let resp = alpaca.getBarsV2(symbol, options);
  for await (let bar of resp) {
    bars.push(bar);
  }
  return bars;
}

module.exports = getHistoricalData;
