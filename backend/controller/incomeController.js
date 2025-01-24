const pool = require("../model/db");

const getIncome = async (req, res) => {
  try {
    // get userid from the reqst obj
    const userId = req.user.id;
    //select all from the income where the userid matches the provided value
    const result = await pool.query("select * from income where user_id = $1", [
      userId,
    ]);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//for post request
const postIncome = async (req, res) => {
  const { source_name, amount, date_received } = req.body;
  //get the userid from the reqst obj if that is available
  const userId = req.user ? req.user.id : null;
  console.log("User ID:", userId);

  //validate input data
  if (!source_name || !amount || !date_received) {
    return res.status(400).send("Bad Request: Missing required fields");
  }

  //f useris is there or not
  if (!userId) {
    return res.status(400).send("Bad Request: Missing user ID");
  }

  try {
    const result = await pool.query(
      "insert into income (user_id, source_name, amount, date_received) values ($1, $2, $3, $4) returning *",
      [userId, source_name, amount, date_received]
    );
    console.log("Added to table:", result);
    //sent inserted row in response
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { getIncome, postIncome };
