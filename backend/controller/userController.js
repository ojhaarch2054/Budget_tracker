const pool = require('../model/db');
const bcrypt = require('bcrypt');

//for post request
const postUsers = async (req, res) => {
    const { email, password, fullname, lastname, address, job, phone } = req.body;
    try {
         //hash the password
         const hashRound = Math.min(10 + Math.floor(password.length / 2), 20);

         const hashedPassword = await bcrypt.hash(password, hashRound);

        const result = await pool.query(
            'INSERT INTO Users (email, password, fullname, lastname, address, job, phone) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [email, hashedPassword, fullname, lastname, address, job, phone]
        );
        console.log('added to table: ' + result)
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const getUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Users');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = { postUsers, getUsers };