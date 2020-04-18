const fetch = require("node-fetch");
const { red, green, cyan } = require("chalk");
const KEYS = require("./keys");

if (process.env.API_KEY === undefined || process.env.API_KEY === "") {
  console.error(red(`You need an API from https://www.alphavantage.co`));
  return;
}

const args = process.argv.splice(2);
const symbol = args[0];

if (symbol === undefined || symbol === "") {
  console.error(red(`You need to specify a symbol`));
  return;
}

const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${
  process.env.API_KEY
}`;

const getData = async url => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

(async () => {
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
})();
