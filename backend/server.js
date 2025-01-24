const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

//middleware to parse JSON
app.use(bodyParser.json());
//middleware to parse cookie
app.use(cookieParser());

//import budget routes
const budgetRouter = require('./routes/budgetRoutes.js');

//load environment variable
dotenv.config();

//middleware to parse json rqst bodies
app.use(express.json());
//enable cors for all routes
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to Budget Tracker');
});

app.use('/', budgetRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});