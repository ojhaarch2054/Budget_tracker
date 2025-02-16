const pool = require("../model/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

//fun to create a jwt token with the user id
const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1m" });
};
//fun to create lrefresh token
const refreshTokenKey = (id, role) => {
  return jwt.sign({ id, role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "5h" });
};
//for post request for register
const postUsers = async (req, res) => {
  const {
    email,
    password,
    fullname,
    lastname,
    address,
    job,
    phone,
    role = "user",
  } = req.body;
  console.log("Received role:", role);

  try {
    //check the email address if already exist in db or not
    const findEmail = await pool.query("select * from users where email = $1", [
      email,
    ]);
    if (findEmail.rows.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    //hash the password
    const hashRound = Math.min(10 + Math.floor(password.length / 2), 20);
    const hashedPassword = await bcrypt.hash(password, hashRound);

    //insert the new user into the database and return the inserted row
    const result = await pool.query(
      "insert into users (email, password, fullname, lastname, address, job, phone, role) values ($1, $2, $3, $4, $5, $6, $7, $8) returning *",
      [email, hashedPassword, fullname, lastname, address, job, phone, role]
    );
    //log the result
    console.log("added to table: " + result);
    //send the user data and ID in the response
    res.status(201).json({ user: result.rows[0], id: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Error creating user" });
  }
};

const getUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Users");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const postLoginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    //find the user by email
    const result = await pool.query("select * from users where email = $1", [
      email,
    ]);
    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const user = result.rows[0];
    //compare the password with the hashed password
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    //create a token for the user
    const token = createToken(user.id, user.role, "1m");
    const refreshT = refreshTokenKey(user.id, user.role, "5h");

    //set the token as a cookie
    res.cookie("jwt", token, { httpOnly: true, maxAge: 5 * 60 * 60 * 1000 });
    res.cookie("refreshToken", refreshT, {
      httpOnly: true,
      maxAge: 5 * 60 * 60 * 1000,
    });

    //send the user data and roles in the response
    res
      .status(200)
      .json({
        id: user.id,
        token: token,
        user: user.email,
        roles: user.role,
        refreshtoken: refreshT,
      });
    console.log(res.status);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//get loggedin use details
const getLogInUserById = async (req, res) => {
  try {
    //extract user id from req obj
    const userId = req.user.id;
    //select the user from table if id matches in with table userid
    const result = await pool.query("select * from users where id = $1", [
      userId,
    ]);
    //send the first row of the result
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//for logout
const logOut = async (req, res) => {
  try {
    //to clear token cokieeeee
    res.clearCookie("jwt");
    res.clearCookie("refreshToken");
    res.status(200).send("Logged out successfully.");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Failed to log out.");
  }
};

//for refresh token
const refreshToken = async (req, res) => {
  //extract the refresh token from the cokies in the rqst
  const refreshToken = req.cookies.refreshToken;
  //if not then send 401 code
  if (!refreshToken) {
    return res.status(401).json({ error: "No refresh token provided" });
  }

  try {
    //verify the refresh token using secret key
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    //create new access token with the user ID and role, valid for 2 hours

    const newToken = createToken(decoded.id, decoded.role, "1m");
    //set the new access token as a cookie in the response 2-hour expiration
    res.cookie("jwt", newToken, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 });
    //send the new access token in the response body
    res.status(200).json({ token: newToken });
  } catch (err) {
    //if the refresh token is invalid log the 403 Forbidden error
    console.error(err);
    res.status(403).json({ error: "Invalid refresh token" });
  }
};

module.exports = {
  postUsers,
  getUsers,
  postLoginUser,
  getLogInUserById,
  logOut,
  refreshToken,
};
