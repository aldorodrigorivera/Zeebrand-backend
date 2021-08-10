
const BD = require("../config");
const Parse = BD.initializeParse();

module.exports = {

  isMe: async (req, res) => {
    try {
      const id = req.userId;
      const query = new Parse.Query(BD.UserClass);
      const user = await query.get(id);
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
