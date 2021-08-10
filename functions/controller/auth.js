const BD = require("../config");
const Parse = BD.initializeParse();
const jwt = require("../middleware/jwt");

module.exports = {
  login: async (req, res) => {
    try {
      const {email, password, audience} = req.body;
      if (!audience || audience !== process.env.AUDIENCE) {
        return res.status(401).send("Incorrect audience");
      }
      const user = await Parse.User.logIn(email, password);
      const token = await jwt.getToken(user);
      res.status(200).send(token);
    } catch (error) {
      res.status(401).send(error);
    }
  },
};
