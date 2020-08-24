require('dotenv').config();
const express = require('express')
const app = express()
const models = require('./models/models.js');
const db = require('./database.js');
const bearerToken = require('express-bearer-token');

db.initDB();

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
            res.status(res.statusCode).json(data);
        }
    });
});

app.listen(3000);