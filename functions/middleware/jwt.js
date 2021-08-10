const jwt = require("jsonwebtoken");

const getToken = (user) => {
  return new Promise((resolve, _) => {
    const token = jwt.sign({
      id: user.id,
      email: user.get("email"),
      audience: process.env.AUDIENCE,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: 60 * 30,
    });
    resolve(token);
  });
};

const validate = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err === null || err === undefined) {
        resolve(decoded);
      } else {
        reject(err);
      }
    });
  });
};

module.exports = {
  getToken,
  validate,
};
