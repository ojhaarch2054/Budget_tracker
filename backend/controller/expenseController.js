const pool = require('../model/db');

const getExpenses = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Expenses');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = { getExpenses };