const express = require('express');
const router = express.Router();

const { getExpenses } = require('../controller/expenseController');
const { getIncome} = require('../controller/incomeController');

router.get('/expenses', getExpenses);
router.get('/income', getIncome);

module.exports = router;