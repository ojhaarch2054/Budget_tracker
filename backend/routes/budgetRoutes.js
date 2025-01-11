const express = require('express');
const router = express.Router();

const { getExpenses, postExpense } = require('../controller/expenseController');
const { getIncome, postIncome} = require('../controller/incomeController');

router.get('/expenses', getExpenses);
router.get('/income', getIncome);
router.post('/incomes/add', postIncome);
router.post('/expenses/add', postExpense);

module.exports = router;