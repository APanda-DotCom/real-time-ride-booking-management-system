const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const connectToDb =require('./db/db');
connectToDb();


const app = express();

const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
    res.send("hello world");
});

module.exports = app;
