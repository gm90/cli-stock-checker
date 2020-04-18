const { quote } = require("./quote");

const args = process.argv.splice(2);
const symbol = args[0];
quote(symbol);
