const expect = require("chai").expect;
const candlestickStrategy = require("../strategies/bullishEngulfing");

describe("Candlestick Strategy", function () {
  it("should trigger a buy order when a Bullish Engulfing pattern is identified", function () {
    const symbol = "AAPL";
    const candles = [
      { OpenPrice: 100, ClosePrice: 98, HighPrice: 101, LowPrice: 97 },
      { OpenPrice: 97, ClosePrice: 101, HighPrice: 102, LowPrice: 96 },
    ];

    const order = candlestickStrategy(symbol, candles);

    expect(order).to.not.be.null;
    expect(order.side).to.equal("buy");
    expect(order.type).to.equal("market");
    expect(order.qty).to.equal(1);
  });

  it("should not trigger an order when a Bullish Engulfing pattern is not identified", function () {
    const symbol = "AAPL";
    const candles = [
      { OpenPrice: 100, ClosePrice: 101, HighPrice: 102, LowPrice: 99 },
      { OpenPrice: 101, ClosePrice: 100, HighPrice: 103, LowPrice: 98 },
    ];

    const order = candlestickStrategy(symbol, candles);

    expect(order).to.be.null;
  });

  it("should return null when there is an insufficient number of candles to identify a pattern", function () {
    const symbol = "AAPL";
    const candles = [
      { OpenPrice: 100, ClosePrice: 98, HighPrice: 101, LowPrice: 97 },
    ];

    const order = candlestickStrategy(symbol, candles);

    expect(order).to.be.null;
  });
});
