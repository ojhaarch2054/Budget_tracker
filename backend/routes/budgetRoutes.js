const express = require('express');
const router = express.Router();

const { getExpenses, postExpense, deleteExpenses} = require('../controller/expenseController');
const { getIncome, postIncome} = require('../controller/incomeController');

router.get('/expenses', getExpenses);
router.get('/income', getIncome);
router.post('/incomes/add', postIncome);
router.post('/expenses/add', postExpense);
router.delete('/expenses/delete/:id', deleteExpenses);

module.exports = router;