require('dotenv').config();
const express = require('express')
const app = express()
const models = require('./models/models.js');
const db = require('./database.js');
var cors = require('cors')
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

db.initDB();

app.use(cors());
app.use(bodyParser.json());

app.post('/users/register', function (req, res) {
    models.registerModel = {
        username: req.query.username,
        firstname: req.query.firstname,
        lastname: req.query.lastname,
        password: req.query.password,
        createdAt: new Date()
    }
    db.postUserToDB(models.registerModel, data => {
        res.status(res.statusCode).json(data);
    });
});

app.post('/users/login', function (req, res) {
    models.loginModel = {
        username: req.query.username,
        password: req.query.password
    }
    db.validateUser(models.loginModel, data => {
        if(data.length === 0) {
            res.status(401).json(data);
        }
        else {
            const accessToken = jwt.sign({ username: data.username,  password: data.password }, process.env.JWT_SECRET);
            res.status(res.statusCode).json(accessToken);
        }
    });
});

app.listen(3000);