const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    const isTokenExist = req.headers.authorization;

    if (!isTokenExist) {
      return res.status(401).send({
        message: "No token provided!",
      });
    }

    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(403).send({
        message: "No token provided!",
      });
    }

    jwt.verify(token, "megha", (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }

      req.headers.userID = decoded.id;
      next();
    });
  } catch (err) {
    res.status(401).send({
      success: false,
      message: "Auth not found",
    });
  }
};

module.exports = { isAuthenticated };
