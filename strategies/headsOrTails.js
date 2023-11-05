module.exports = (symbol, currentPrice) => {
  if (typeof symbol !== "string" || typeof currentPrice !== "number")
    return null;

  // Randomly choose between buy (1) and sell (0)
  const action = Math.round(Math.random());
  const roundedCurrentPrice = Math.round(currentPrice * 100) / 100; // Rounds to the nearest penny

  if (action === 1) {
    return {
      symbol: symbol,
      qty: 1,
      side: "buy",
      type: "market",
      time_in_force: "gtc",
      order_class: "bracket",
      stop_loss: {
        stop_price: Math.round(roundedCurrentPrice * 0.95 * 100) / 100,
        limit_price: Math.round(roundedCurrentPrice * 0.94 * 100) / 100,
      },
      take_profit: {
        // Ronding used to avoid "sub-penny increment does not fulfill minimum pricing criteria"
        limit_price: Math.round(roundedCurrentPrice * 1.05 * 100) / 100,
      },
    };
  } else {
    return {
      symbol: symbol,
      qty: 1,
      side: "sell",
      type: "market",
      time_in_force: "gtc",
      order_class: "bracket",
      stop_loss: {
        stop_price: Math.round(roundedCurrentPrice * 1.05 * 100) / 100,
        limit_price: Math.round(roundedCurrentPrice * 1.06 * 100) / 100,
      },
      take_profit: {
        limit_price: Math.round(roundedCurrentPrice * 0.95 * 100) / 100,
      },
    };
  }
};
