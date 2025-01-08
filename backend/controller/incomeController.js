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

module.exports = { getIncome };