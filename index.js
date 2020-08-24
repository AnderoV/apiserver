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

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        jwt.verify(authHeader, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

app.post('/users/register', (req, res) => {
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

app.post('/users/login', (req, res) => {
    models.loginModel = {
        username: req.query.username,
        password: req.query.password
    }
    db.validateUser(models.loginModel, data => {
        if(data.length === 0) {
            res.status(401).json(data);
        }
        else {
            const accessToken = jwt.sign({ username: data[0].username,  id: data[0].id }, process.env.JWT_SECRET, { expiresIn: '60m' });
            models.loginModel = {
                username: data[0].username,
                firstname: data[0].firstname,
                lastname: data[0].lastname,
                accesstoken: accessToken
            }
            
            res.status(res.statusCode).json(models.loginModel);
        }
    });
});

app.get('/user', authenticateJWT, (req, res) => {
    let userId = req.user.id;
    db.getUserData(userId, data => {
        models.userModel = {
            username: data[0].username,
            firstname: data[0].firstname,
            lastname: data[0].lastname,
            password: data[0].password,
            createdAt: data[0].createdat
        }
        res.status(res.statusCode).json(models.userModel);
    });
});

app.put('/user', authenticateJWT, (req, res) => {
    let newData = {
        password: req.query.password,
        userId: req.user.id
    }
    db.editUserData(newData, data => {
        res.status(res.statusCode).json(data);
    });
});

app.listen(3000);