const express = require('express')
const app = express()
const models = require('./models/models.js');
 
app.get('/users/register', function (req, res) {
  res.send('');
})

app.post('/users/register', function (req, res) { //req.query
    res.send(models.registerModel);
  })
 
app.listen(3000);