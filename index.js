require("dotenv").config();
const alpaca = require("./alpaca");
const getHistoricalData = require("./getHistoricalData");
const headsOrTails = require("./strategies/headsOrTails");
const bullishEngulfingStrategy = require("./strategies/bullishEngulfing");

// const activeAssets = alpaca
//   .getAssets({
//     status: "active",
//   })
//   .then((activeAssets) => {
//     const AAPL = activeAssets.filter((asset) => asset.symbol == "AAPL");
//     console.log(AAPL);
//   });

const runHeadsOrTails = async (symbol) => {
  const FIFTEEN_MINUTES = 15 * 60 * 1000;

  const bars = await getHistoricalData(symbol, {
    start: new Date(new Date().setDate(new Date().getDate() - 2)),
    end: new Date(new Date().getTime() - FIFTEEN_MINUTES),
    timeframe: "1Hour",
  });

  const lastBar = bars[bars.length - 1];
  const currentPrice = lastBar.ClosePrice;

  const order = headsOrTails(symbol, currentPrice);
  return alpaca.createOrder(order);
};

const runBullishEngulfing = async (symbol) => {
  const FIFTEEN_MINUTES = 15 * 60 * 1000;

  // Retrieve historical bar data
  const bars = await getHistoricalData(symbol, {
    start: new Date(new Date().setDate(new Date().getDate() - 2)),
    end: new Date(new Date().getTime() - FIFTEEN_MINUTES),
    timeframe: "1Hour",
  });

  // Ensure there are at least two bars to check for the pattern
  if (!bars || bars.length < 2) {
    throw new Error("Not enough data to identify a Bullish Engulfing pattern");
  }

  // Use the last two bars to check for the Bullish Engulfing pattern
  const lastTwoBars = bars.slice(-2);

  // Determine if there is a Bullish Engulfing pattern
  const orderDetails = bullishEngulfingStrategy(symbol, lastTwoBars);

  // If the pattern is identified, create the order
  if (orderDetails) {
    return alpaca.createOrder(orderDetails);
  } else {
    // If no pattern is identified, you might want to log this information or handle it accordingly
    console.log("No Bullish Engulfing pattern identified. No order created.");
    return null;
  }
};

runBullishEngulfing("AAPL").then(console.log);
