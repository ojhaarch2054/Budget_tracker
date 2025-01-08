const express = require ('express');
const cors = require('cors');
const dotenv = require('dotenv');

const budgetRouter = require('./routes/budgetRoutes.js')

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())

app.get('/', (req,res) => {
    res.send('Welcome to Budget Tracker');
})

app.use('/', budgetRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('server running on port ' + port)
});