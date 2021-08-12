const jwt = require("../middleware/jwt");
const BD = require("../config");
const Parse = BD.initializeParse();

module.exports = {
  isAuth: async (req, res, next) => {
    if (!req.headers["authorization"]) {
      return res.status(401).send({error: "No token provider"});
    }
    if (req.headers["authorization"].split(" ")[0] !== "Bearer") {
      return res.status(401).send({error: "Wrong type of token provider"});
    }

    const token = req.headers["authorization"].split(" ")[1];
    try {
      const {id} = await jwt.validate(token);
      if (!id) {
        return res.status(401).send({error: "Invalid token"});
      }
      const query = new Parse.Query(BD.UserClass);
      const user = await query.get(id);
      if (!user) {
        return res.status(401).send({error: "User not found, invalid token"});
      }
      req.userId = id;
      next();
    } catch (error) {
      return res.status(401).send({error: error.message});
    }
  },
};
