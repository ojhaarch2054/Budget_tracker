const pool = require('../model/db');

//get rqst
const getExpenses = async (req, res) => {
    try {
        // get userid from the reqst obj
        const userId = req.user.id;
        const result = await pool.query('SELECT * FROM Expenses WHERE user_id = $1', [userId]);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

//post rqst
const postExpense = async (req, res) => {
    const { category, amount, date_paid } = req.body;
    // get userid from the reqst obj
    const userId = req.user.id;
    console.log('Request body:', req.body);
    console.log('User ID:', userId);
    try {
        const result = await pool.query(
            'INSERT INTO Expenses (user_id, category, amount, date_paid) VALUES ($1, $2, $3, $4) RETURNING *',
            [userId, category, amount, date_paid]
        );
        console.log('added to table: ' + result)
        res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('Error adding expense:', err.message);
        res.status(500).send('Server Error');
    }
};

//delete request
const deleteExpenses = async (req, res) => {
    const { id } = req.params;
    // get userid from the reqst obj
    const userId = req.user.id; 
    try {
        const result = await pool.query(
            'DELETE FROM Expenses WHERE expense_id = $1 AND user_id = $2 RETURNING *',
            [id, userId]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Error deleting expense:', err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = { getExpenses, postExpense , deleteExpenses};