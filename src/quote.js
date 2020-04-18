const { red, green, cyan } = require("chalk");
const KEYS = require("./keys");
const { getData } = require("./fetch");

const quote = async symbol => {
  if (
    process.env.API_KEY === null ||
    process.env.API_KEY === undefined ||
    process.env.API_KEY === ""
  ) {
    console.error(red(`You need an Api Key from https://www.alphavantage.co`));
    return false;
  }

  if (symbol === undefined || symbol === "") {
    console.error(red(`You need to specify a symbol`));
    return false;
  }

  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${
    process.env.API_KEY
  }`;

  const data = await getData(url);
  const properties = data[KEYS.heading];

  // for (let [key, value] of Object.entries(properties)) {
  //   console.log(`${key}: ${value}`);
  // }

  const price = `${properties[KEYS.price]}`;
  const priceInDollars = `$${price}`;
  const close = properties[KEYS.close];
  console.log(
    `Stock price for ${cyan(symbol.toUpperCase())} is ${
      parseFloat(price) > parseFloat(close)
        ? green(priceInDollars)
        : red(priceInDollars)
    }`
  );
};

module.exports = {
  quote
};
