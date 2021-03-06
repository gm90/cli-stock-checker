const sinon = require("sinon");
const fetch = require("./../src/fetch");
const { quote } = require("./../src/quote");
const { red } = require("chalk");
const { expect } = require("chai");

const consoleSpy = sinon.spy(console, "error");

describe("Quote", () => {
  it("should log an error if no Api Key has been set", () => {
    process.env.API_KEY = "";
    quote("TSLA");
    expect(
      consoleSpy.calledWith(
        red(`You need an Api Key from https://www.alphavantage.co`)
      )
    );
  });

  it("should log an error if called with no symbol", () => {
    process.env.API_KEY = "some-key";
    quote("");
    expect(consoleSpy.calledWith(red("You need to specify a symbol")));
  });

  // it("should getData with the complete url ", () => {
  //   process.env.API_KEY = "some-key";
  //   sinon.stub(fetch, "getData").returns(3);

  //   const getDataSpy = sinon.spy(fetch, "getData");
  //   quote("some-symbol");
  //   expect(
  //     getDataSpy.calledWith(
  //       "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=some-symbol&apikey=some-key"
  //     )
  //   );
  // });
});
