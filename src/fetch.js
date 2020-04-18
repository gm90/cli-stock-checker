const fetch = require("node-fetch");

const getData = async url => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getData
};
