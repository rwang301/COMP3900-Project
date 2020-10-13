const express = require('express');
const sqlite = require('sqlite3');
const bodyParser = require('body-parser');
const fs = require("fs");

const app = express();
app.use(require('cors')());
app.use(bodyParser.json());

const port = 8000;
const db = new sqlite.Database('./db/database.db', err => err ? console.log(err.message) : console.log('Connected to database successfully'));

const sendResponse = (response, status, message, data) => {
    response.status(status);
    response.send({data: data});
    console.log(message);
}

app.post('/auth/login', (req, res) => {
    const sql = 'select * from users';
    db.all(sql, [], (err, users) => {
        if (err) {
            sendResponse(res, 500, err.message);
        } else {
            const {email, password} = req.body;
            if (users.length) {// if there are users in the database
                for (const user of users) {
                    if (user.email === email && user.password === password) {
                        sendResponse(res, 200, 'Successful login', user.employer);
                        return;
                    }
                }
                sendResponse(res, 403, 'User does not exist');
            } else sendResponse(res, 403, 'User does not exist');
        }
    });
});

app.post('/auth/register', (req, res) => {
    const {name, email, password, employer} = req.body;
    const sql = `select email from users where email = '${email}'`;
    db.get(sql, [], (err, user) => {
        if (err) {
            sendResponse(res, 500, err.message);
        } else {
            if (user) {// if user with email already exists
                sendResponse(res, 409, `${email} already exists`);
            } else {
                db.run(`insert into Users values ('${name}', '${email}', '${password}', '${employer}')`);
                sendResponse(res, 200, `Inserted ${name} into the database`);
            }
        }
    });
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));

db.run(fs.readFileSync("./db/users.sql").toString());