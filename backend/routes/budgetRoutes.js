const express = require('express');
const router = express.Router();

const { getExpenses, postExpense, deleteExpenses} = require('../controller/expenseController');
const { getIncome, postIncome} = require('../controller/incomeController');
const {getUsers, postUsers} = require('../controller/userController')

router.get('/expenses', getExpenses);
router.get('/income', getIncome);
router.post('/incomes/add', postIncome);
router.post('/expenses/add', postExpense);
router.delete('/expenses/delete/:id', deleteExpenses);
//for users
router.get('/users', getUsers);
router.post('/users', postUsers);

module.exports = router;