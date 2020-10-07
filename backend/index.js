const express = require('express');
const sqlite = require('sqlite3')

const port = 8000;
const app = express();
app.use(require('cors')());
const db = new sqlite.Database('./database.db');

app.get('/', (req, res) => {
    console.log("homepage");
    res.send({status: 200});
});

app.get('/users', (req, res) => {
    console.log("users");
    res.send({status: 200});
});

app.post('/user/update', (req, res) => {
    console.log('update');
    res.send({status: 200});
});

app.listen(port);
db.close();