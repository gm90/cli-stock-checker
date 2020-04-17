const fetch = require("node-fetch");
const chalk = require("chalk");

const symbol = "TSLA";
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

const ticker = async () => {
  const data = await getData(url);
  const properties = data["Global Quote"];

  // for (let [key, value] of Object.entries(properties)) {
  //   console.log(`${key}: ${value}`);
  // }

  const price = `$${properties["05. price"]}`;
  const change = properties["09. change"];
  console.log(
    `Stock price for ${chalk.blue(symbol)} is ${
      change > 0 ? chalk.green(price) : chalk.red(price)
    }`
  );
};

ticker();
