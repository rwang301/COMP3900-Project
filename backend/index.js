const express = require('express');
const sqlite = require('sqlite3');

const port = 8000;
const app = express();
app.use(require('cors')());
const db = new sqlite.Database('./db/test.sqlite3', err => err ? console.log(err.message) : console.log('Connected to database successfully'));

app.get('/', (req, res) => {
    console.log('root');
    res.send({status: 200});
});

app.get('/users', (req, res) => {
    console.log('users');
    res.send({status: 200, data: getUsers(db)});
});

app.post('/user/update', (req, res) => {
    console.log('update');
    res.send({status: 200});
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));

function getUsers(db) {
    const sql = 'select * from users';
    db.all(sql, [], (err, row) => err ? console.log(err.message) : row);
}