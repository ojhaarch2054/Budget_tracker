const express = require('express');
const router = express.Router();

const { getExpenses } = require('../controller/expenseController');
const { getIncome, postIncome} = require('../controller/incomeController');

router.get('/expenses', getExpenses);
router.get('/income', getIncome);
router.post('/income/add', postIncome);

module.exports = router;