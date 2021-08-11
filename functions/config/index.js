const Parse = require("parse/node");

module.exports = {
  initializeParse() {
    Parse.initialize(process.env.PARSE_ID);
    Parse.serverURL = process.env.PARSE_SERVER_URL;
    Parse.masterKey = process.env.PARSE_MASTER;
    Parse.javaScriptKey = process.env.PARSE_JAVASCRIPT_KEY;
    return Parse;
  },

  UserClass: Parse.Object.extend("User"),
  ProductClass: Parse.Object.extend("Catalog"),
};
