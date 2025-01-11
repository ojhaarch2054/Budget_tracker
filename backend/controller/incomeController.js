const pool = require('../model/db');

const getIncome = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Income');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

//for post request
const postIncome = async (req, res) => {
    const { source_name, amount, date_received } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO Income (source_name, amount, date_received) VALUES ($1, $2, $3) RETURNING *',
            [source_name, amount, date_received]
        );
        console.log('added to table: ' + result)
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = { getIncome, postIncome };