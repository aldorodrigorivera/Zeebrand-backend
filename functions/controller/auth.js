const BD = require("../config");
const Parse = BD.initializeParse();
const jwt = require("../middleware/jwt");
const validator = require("../validator/auth");

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

  singUp: async (req, res) => {
    try {
      const {valid, msn} = validator.validSingUp(req.body);
      if (!valid) {
        return res.status(400).send(msn);
      }
      const {email, password, name} = req.body;
      const register = new Parse.User();
      register.set("name", name);
      register.set("password", password);
      register.set("email", email);
      const user = await register.signUp();

      const token = await jwt.getToken(user);
      res.status(200).send({user, token});
    } catch (error) {
      res.status(400).send(error);
    }
  },

  logout: async (req, res) => {
    try {
      const user = await Parse.User.logOut();
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
