const express = require('express');
const sqlite = require('sqlite3');

const port = 8000;
const app = express();
app.use(require('cors')());
const db = new sqlite.Database('./db/example.db', err => err ? console.log(err.message) : console.log('Connected to database successfully'));

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

app.post('/user/add', (req, res) => {
    console.log(req.query);
    res.send({status: 200});
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));