const express = require('express');
const sqlite = require('sqlite3');
const bodyParser = require('body-parser');
const fs = require("fs");

const app = express();
app.use(require('cors')());
app.use(bodyParser.json());

const port = 8000;
const db = new sqlite.Database('./db/database.db', err => err ? console.log(err.message) : console.log('Connected to database successfully'));

app.post('/auth/login', (req, res) => {
    const sql = 'select * from users';
    db.all(sql, [], (err, users) => {
        if (err) {
            console.log(err.message);
            res.send({status: 500});
        } else {
            const {email, password} = req.body;
            if (users.length) {// if there are users in the database
                for (const user of users) {
                    if (user.email === email && user.password === password) {
                        res.send({status: 200});
                        return;
                    }
                }
                res.send({status: 403});
            } else res.send({status: 403});
        }
    });
});

app.post('/auth/register', (req, res) => {
    const {name, email, password, employer} = req.body;
    const sql = `select email from users where email = '${email}'`;
    db.get(sql, [], (err, user) => {
        if (err) {
            console.log(err.message);
            res.send({status: 500});
        } else {
            if (user) {// if user already exists
                res.send({status: 403});
            } else {
                db.run(`insert into Users values ('${name}', '${email}', '${password}', '${employer}')`);
                res.send({status: 200});
            }
        }
    });
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));

db.run(fs.readFileSync("./db/users.sql").toString());