const express = require('express');
const router = express.Router();

const { getExpenses, postExpense, deleteExpenses } = require('../controller/expenseController');
const { getIncome, postIncome } = require('../controller/incomeController');
const { getUsers, postUsers, postLoginUser, getLogInUserById, logOut } = require('../controller/userController');
const { fetchUsers, authorizeRole } = require('../middleware/authMiddleware');

// All routes
router.get('/expenses', fetchUsers, authorizeRole(['user']), getExpenses);
router.get('/income', fetchUsers, authorizeRole(['user']), getIncome);
router.post('/incomes/add', fetchUsers, authorizeRole(['user']), postIncome);
router.post('/expenses/add', fetchUsers, authorizeRole(['user']), postExpense);
router.delete('/expenses/delete/:id', fetchUsers, authorizeRole(['user']), deleteExpenses);

// For users
router.get('/users', fetchUsers, authorizeRole(['user']), getUsers);
router.post('/users',  postUsers);
router.post('/login', postLoginUser);
router.get('/users/:id', fetchUsers, authorizeRole(['user']), getLogInUserById);
router.post('/logout', fetchUsers, authorizeRole(['user']), logOut);

module.exports = router;