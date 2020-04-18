const assert = require("assert");
const sinon = require("sinon");
const { quote } = require("./../src/index");

describe("Quote", () => {
  it("should log an error if called with no symbol", () => {
    process.env.API_KEY = "some-key";
    const consoleSpy = sinon.spy(console, "error");
    quote(undefined);
    assert(consoleSpy.calledWith("You need to specify a symbol"));
  });
});
