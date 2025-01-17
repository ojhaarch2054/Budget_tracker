const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const app = express();

//middleware to parse JSON
app.use(bodyParser.json());

const budgetRouter = require('./routes/budgetRoutes.js');

dotenv.config();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to Budget Tracker');
});

app.use('/', budgetRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});