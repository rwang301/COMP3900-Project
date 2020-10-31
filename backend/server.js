import express from 'express';
import sqlite from 'sqlite3';
import bodyParser from 'body-parser';
import cors from 'cors';

import createTables from './src/db.js';
import { login, register } from './src/auth.js';
import { postJob } from './src/employer.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 8000;
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));

export const db = new sqlite.Database('./db/database.db', err => err ? console.log(err.message) : console.log('Connected to database successfully'));
createTables();

export const sendResponse = (response, status, message, data) => {
    response.status(status).send(data);
    console.log(message);
}

app.post('/auth/login', login);
app.post('/auth/register', register);
app.post('/post/job', postJob);

app.get('/matches', (req, res) => {
    const { token } = req.header;
    const data = [];
    db.all(`select email from users where token = '${token}'`, [], (err, rows) => {
        if (err) {
            sendResponse(res, 500, err.message);
        } else {
            rows.forEach(row => {
                data.push(row);
            });
        }
    });
    sendResponse(res, 200, `Getting matches for `, data);
});