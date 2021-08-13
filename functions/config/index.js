const Parse = require("parse/node");

module.exports = {
  initializeParse() {
    Parse.initialize(
        process.env.PARSE_ID,
        process.env.PARSE_JAVASCRIPT_KEY,
        process.env.PARSE_MASTER);
    Parse.serverURL = process.env.PARSE_SERVER_URL;
    return Parse;
  },

  UserClass: Parse.Object.extend("User"),
  ProductClass: Parse.Object.extend("Product"),
};
