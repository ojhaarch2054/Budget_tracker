const express = require ('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json);
app.use(cors())

app.get('/', (req,res) => {
    res.send('Welcome to Budget Tracker');
})

const port = process.env.PORT

app.listen(port, () => {
    console.log('server running on port ' + port)
});