const pool = require("../model/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");


dotenv.config();

//this is in secends 3 days
const maxTime = 3 * 24 * 60 * 60;
//fun to create a jwt token with the user id
const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: maxTime });
};

//for post request
const postUsers = async (req, res) => {
  const { email, password, fullname, lastname, address, job, phone, role = 'user' } = req.body;
  console.log("Received role:", role);

  try {
    //check the email address if already exist in db or not
    const findEmail = await pool.query("select * from users where email = $1", [email])
    if(findEmail.rows.length > 0){
      return res.status(400).json({error: "Email already exists"})
    }
    
    //hash the password
    const hashRound = Math.min(10 + Math.floor(password.length / 2), 20);
    const hashedPassword = await bcrypt.hash(password, hashRound);

    //insert the new user into the database and return the inserted row
    const result = await pool.query(
      "insert into users (email, password, fullname, lastname, address, job, phone, role) values ($1, $2, $3, $4, $5, $6, $7, $8) returning *",
      [email, hashedPassword, fullname, lastname, address, job, phone, role]
    );
    

    //create a token for new user
    const token = createToken(result.rows[0].id, result.rows[0].role);
    console.log("Created token with role:", result.rows[0].role);

    //set the token as a cookie
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxTime * 1000 });

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
    const token = createToken(user.id, user.role);
    //set the token as a cookie
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxTime * 1000 });
    //send the user data and roles in the response
    res.status(200).json({ id: user.id, token: token, user: user.email, roles: user.role  });
    console.log(res.status)
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
    res.clearCookie('jwt');
    res.status(200).send('Logged out successfully.');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Failed to log out.');
  }
}


module.exports = {
  postUsers,
  getUsers,
  postLoginUser,
  getLogInUserById,
  logOut
};
