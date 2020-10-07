const express = require('express');
const sqlite = require('sqlite3')

const port = 5000;
const app = express();
app.use(require('cors')());
const db = new sqlite.Database('./database.db');

app.get('/', (req, res) => {
    console.log("homepage");
    res.send({});
});

app.get('/users', (req, res) => {
    console.log("users");
    res.send({});
});

app.post('/user/update', (req, res) => {
    console.log('update');
    res.send({});
});

app.listen(port);
db.close();