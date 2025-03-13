const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

//to authenticate users using JWT
const fetchUsers = (req, res, next) => {
  //if the jwt cookie is not present
  if (!req.cookies.jwt) {
    return res.status(401).send({ error: "Authorization token is missing" });
  }
  //get token from the cookies
  const token = req.cookies.jwt;
  //if no token
  if (!token) {
    return res.status(401).send({ error: "Please authenticate using valid token" });
  }
  try {
    //verify token using secret key
    const data = jwt.verify(token, process.env.JWT_SECRET);
    //attach decoded data to req obj
    req.user = data;
    req.user.role = 'user';
    next();
  } catch (err) {
    //if token verification fails
    res.status(401).send({ error: "Please authenticate using valid token" });
  }
};

const authorizeRole = (roles) => {
  return (req, res, next) => {
    //if the user is authenticated and has one of the required roles
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};

module.exports = { fetchUsers, authorizeRole };