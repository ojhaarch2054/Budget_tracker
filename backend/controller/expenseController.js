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

//for delete rqst
const deleteExpenses = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query(
        'DELETE FROM Expenses WHERE expense_id = $1 RETURNING *',
        [id]
      );
      if (result.rowCount === 0) {
        //console.log(`Expense with id: ${id} not found`);
        return res.status(404).json({ error: 'Expense not found' });
      }
      //console.log('Deleted expense:', result.rows[0]);
      res.status(200).json(result.rows[0]);
    } catch (err) {
      //console.error('Error deleting expense:', err.message);
      res.status(500).send('Server Error');
    }
  };
  
module.exports = { getExpenses, postExpense , deleteExpenses};