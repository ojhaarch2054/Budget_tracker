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

//for post request
const postExpense = async (req, res) => {
    const { category, amount, date_paid } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO Expenses (category, amount, date_paid) VALUES ($1, $2, $3) RETURNING *',
            [category, amount, date_paid]
        );
        console.log('added to table: ' + result)
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = { getExpenses, postExpense };