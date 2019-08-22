const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token not provided" });
  }

  const [, token] = authHeader.split(" ");

  return promisify(jwt.verify)(token, process.env.APP_SECRET)
    .then(decoded => {
      req.userId = decoded.id;
      return next();
    })
    .catch(err => res.status(401).json({ message: "Token invalid" }));
};
