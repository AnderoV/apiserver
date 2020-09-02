require('dotenv').config();
const express = require('express')
const app = express()
const models = require('./models/models.js');
const db = require('./database.js');
var cors = require('cors')
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
let port = process.env.PORT || 3000;

db.initUserDB();
db.initTaskDB();

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
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
        createdAt: new Date()
    }
    db.postUserToDB(models.registerModel, data => {
        res.status(res.statusCode).json(data);
    });
});

app.post('/users/login', (req, res) => {
    models.loginModel = {
        username: req.body.username,
        password: req.body.password
    }
    db.validateUser(models.loginModel, data => {
        if (data.length === 0) {
            res.status(401).json(data);
        }
        else {
            const accessToken = jwt.sign({ username: data[0].username, id: data[0].id }, process.env.JWT_SECRET, { expiresIn: '60m' });
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
        password: req.body.password,
        userId: req.user.id
    }
    db.editUserData(newData, data => {
        res.status(res.statusCode).json(data);
    });
});

app.post('/tasks', authenticateJWT, (req, res) => {
    let newTask = {
        userId: req.user.id,
        title: req.body.title,
        description: req.body.description,
        markedAsDone: req.body.markedasdone,
        createdAt: new Date()
    }
    db.postTaskToDB(newTask, data => {
        models.addTaskModel = {
            title: data.title,
            description: data.description,
            markedAsDone: data.markedAsDone,
            createdAt: data.createdAt
        }
        res.status(res.statusCode).json(models.addTaskModel);
    });
});

app.get('/tasks', authenticateJWT, (req, res) => {
    let userId = req.user.id;
    db.getAllTasks(userId, data => {
        let tasks = [];
        data.forEach(task => {
            models.taskModel = {
                id: task.id,
                title: task.title,
                description: task.description,
                markedAsDone: task.markedasdone,
                createdAt: task.createdat
            }
            tasks.push(models.taskModel);
        })
        res.status(res.statusCode).json(tasks);
    });
});

app.get('/tasks/:id', authenticateJWT, (req, res) => {
    let userId = req.user.id;
    let id = parseInt(req.params.id);
    db.getTaskById(userId, id, data => {
        if (data.length === 0) {
            res.status(404).json();
        }
        else {
            models.taskModel = {
                id: data[0].id,
                title: data[0].title,
                description: data[0].description,
                markedAsDone: data[0].markedasdone,
                createdAt: data[0].createdat
            }
            res.status(res.statusCode).json(models.taskModel);
        }
    });
});

app.put('/tasks/:id', authenticateJWT, (req, res) => {
    let newData = {
        userId: req.user.id,
        id: parseInt(req.params.id),
        title: req.body.title,
        description: req.body.description,
        markedAsDone: req.body.markedasdone
    }
    db.editTaskData(newData, data => {
        res.status(res.statusCode).json(data);
    });
});

app.delete('/tasks/:id', authenticateJWT, (req, res) => {
    let id = parseInt(req.params.id)
    let userid = req.user.id
    db.deleteTask(id, userid, data => {
        res.status(res.statusCode).json(data);
    });
});

app.listen(port);