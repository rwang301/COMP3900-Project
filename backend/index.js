const express = require('express');
const sqlite = require('sqlite3');
const bodyParser = require('body-parser');
const fs = require("fs");

const app = express();
app.use(require('cors')());
app.use(bodyParser.json());

const port = 8000;
const db = new sqlite.Database('./db/database.db', err => err ? console.log(err.message) : console.log('Connected to database successfully'));

app.get('/', (req, res) => {
    console.log('root');
    res.send({status: 200});
});

app.get('/users', (req, res) => {
    const sql = 'select * from users';
    db.all(sql, [], (err, row) => {
        if (err) {
            console.log(err.message);
        } else {
            res.send({status: 200, data: row});
        }
    });
});

app.post('/auth/login', (req, res) => {
    console.log(req.body);
    res.send({status: 200});
});

app.post('/auth/register', (req, res) => {
    console.log(req.body);
    res.send({status: 200});
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));

const dataSql = fs.readFileSync("./db/users.sql").toString();
db.run(dataSql);