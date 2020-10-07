const express = require('express');
const sqlite = require('sqlite3')
const db = new sqlite.Database('./database.db');

const app = express();
const port = 3000;

app.get('/', () => {
    console.log("homepage");
    return {};
});

app.get('/users', () => {
    console.log("users");
    return {};
});

app.post('/user/update', (req, res) => {
    console.log('update');
    return {};
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

db.close();