const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.status(401).json({ message: "Access Denied. No Token Provided." });
    }

    const token = authHeader.split(" ")[1]; // remove "Bearer "

    if (!token) {
      return res.status(401).json({ message: "Invalid Token Format" });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.admin = verified;

    next();

  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;