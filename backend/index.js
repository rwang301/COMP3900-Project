const express = require('express');
const sqlite = require('sqlite3');
const bodyParser = require('body-parser');

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
                        const query = 'select * from employers';
                        db.all(query, [], (err, employers) => {
                            if (err) {
                                sendResponse(res, 500, err.message);
                                return;
                            } else {
                                for (const employer of employers) {
                                    if (employer.email === email) {
                                        sendResponse(res, 200, 'Successful login as an employer', true);
                                        return;
                                    }
                                }
                                sendResponse(res, 200, 'Successful login as a job seeker', false);
                            }
                        });
                        return;
                    }
                }
            }
            sendResponse(res, 403, 'User does not exist');
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
                db.run(`insert into Users values ('${name}', '${email}', '${password}')`);
                db.run(`insert into ${employer ? 'Employers' : 'JobSeekers'} values ('${email}')`);
                sendResponse(res, 200, `Inserted ${name} into the database`);
            }
        }
    });
});

app.post('/post/job', (req, res) => {
    const { job_title, location, description, employment_type, closing_date } = req.body;
    console.log(req.body);
    db.run(`insert into Jobs (job_title, location, description, employment_type, closing_date) values ('${job_title}', '${location}', '${description}', '${employment_type}', '${closing_date}')`);
    const sql = `select id from Jobs order by id desc`;
    db.get(sql, [], (err, row) => {
        console.log(row);
        if (err) {
            sendResponse(res, 500, err.message);
        } else {
            const { token } = req.header;
            db.run(`insert into Posts values ('${employer_email}', '${row.job_id}')`);
        }
    });
});

/*
app.get('/matches', (req, res) => {
    const { token } = req.header;
    const sql = `select email from users where token = '${token}'`;
    const data = [];
    db.all(sql, [], (err, rows) => {
        if (err) {
            sendResponse(res, 500, err.message);
        } else {
            rows.forEach(row => {
                data.push(row);
            });
        }
    })
    sendResponse(res, 200, `Getting matches for `, data);
});
*/

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
db.run(`
create table if not exists Users (
    name text not null,
    email text,
    password text not null,
    primary key (email)
)`);

db.run(`
create table if not exists JobSeekers (
    email text primary key,
    foreign key(email) references Users(email)
)`);

db.run(`
create table if not exists Employers (
    email text primary key,
    foreign key(email) references Users(email)
)`);

db.run(`
create table if not exists Offers (
    id integer primary key autoincrement,
    message text not null,
    kind text not null check (kind in ('offer', 'interview'))
)`);

db.run(`
create table if not exists Sends (
    employer_email text references Employers(email),
    offer_id integer references Offers(id),
    primary key(employer_email, offer_id)
)`);

db.run(`
create table if not exists Jobs (
    id integer primary key autoincrement,
    job_title text not null,
    location text not null,
    description text not null,
    employment_type text not null check (employment_type in ('casual', 'full-time', 'part-time')),
    closing_date text not null
)`);

db.run(`
create table if not exists Posts (
    employer_email text references Employers(email),
    job_id integer references Jobs(id),
    primary key(employer_email, job_id)
)`);

db.run(`
create table if not exists Applications (
    id integer primary key autoincrement,
    cover_letter text,
    resume text not null
)`)

db.run(`
create table if not exists Applies (
    job_seeker_email text references JobSeekers(email),
    application_id integer references Applications(id),
    primary key(job_seeker_email, application_id)
)`);

db.run(`
create table if not exists Skills (
    skill text,
    job_seeker_email integer,
    foreign key (job_seeker_email) references JobSeekers(email),
    primary key (job_seeker_email, skill)
)`);

db.run(`
create table if not exists Matches (
    application_id integer references Applications(id),
    job_id integer references Jobs(id),
    primary key (application_id, job_id)
)`);
