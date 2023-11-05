const expect = require("chai").expect;
const orderStrategy = require("../strategies/headsOrTails");

describe("Order Strategy Module", function () {
  it("should return an object with the correct properties for a buy or sell order", function () {
    const symbol = "AAPL";
    const currentPrice = 150; // Mock price for testing

    const order = orderStrategy(symbol, currentPrice);

    expect(order).to.be.an("object");
    expect(order).to.have.all.keys(
      "symbol",
      "qty",
      "side",
      "type",
      "time_in_force",
      "order_class",
      "stop_loss",
      "take_profit"
    );
    expect(order.symbol).to.equal(symbol);
    expect(order.qty).to.equal(1);
    expect(order.type).to.equal("market");
    expect(order.time_in_force).to.equal("gtc");
    expect(order.order_class).to.equal("bracket");

    // Check if the action is buy
    if (order.side === "buy") {
      expect(order.stop_loss.stop_price).to.be.closeTo(
        currentPrice * 0.95,
        0.01
      );
      expect(order.stop_loss.limit_price).to.be.closeTo(
        currentPrice * 0.94,
        0.01
      );
      expect(order.take_profit.limit_price).to.be.closeTo(
        currentPrice * 1.05,
        0.01
      );
    }

    // Check if the action is sell
    if (order.side === "sell") {
      expect(order.stop_loss.stop_price).to.be.closeTo(
        currentPrice * 1.05,
        0.01
      );
      expect(order.stop_loss.limit_price).to.be.closeTo(
        currentPrice * 1.06,
        0.01
      );
      expect(order.take_profit.limit_price).to.be.closeTo(
        currentPrice * 0.95,
        0.01
      );
    }
  });

  it("should return null in case of missing params", function () {
    const symbol = "AAPL";

    const order = orderStrategy(symbol);
    expect(order).to.be.null;
  });
});
