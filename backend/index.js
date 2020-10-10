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

app.post('/auth/login', (req, res) => {
    const sql = 'select * from users';
    db.all(sql, [], (err, users) => {
        if (err) {
            console.log(err.message);
        } else {
            res.send({status: 200, data: users});
        }
    });
    console.log(req.body);
    res.send({status: 200});
});

app.post('/auth/register', (req, res) => {
    const {name, email, password} = req.body;
    db.run(`insert into Users values (${name}, ${email}, ${password})`);
    res.send({status: 200});
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));

db.run(fs.readFileSync("./db/users.sql").toString());