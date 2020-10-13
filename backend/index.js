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
                                        sendResponse(res, 200, 'Successful login', true);
                                        return;
                                    }
                                }
                                sendResponse(res, 200, 'Successful login', false);
                            }
                        });
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
                db.run(`insert into Users values ('${name}', '${email}', '${password}')`);
                db.run(`insert into ${employer ? 'Employers' : 'JobSeekers'} values ('${email}')`);
                sendResponse(res, 200, `Inserted ${name} into the database`);
            }
        }
    });
});

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
    id serial,
    message text not null,
    kind text not null check (kind in ('offer', 'interview')),
    primary key(id)
)`);

db.run(`
create table if not exists Sends (
    employer_email text references Employers(email),
    offer_id serial references Offers(id),
    primary key(employer_email, offer_id)
)`);

db.run(`
create table if not exists Jobs (
    id serial,
    closing_date datetime not null,
    description text not null,
    responsibilities text not null,
    remuneration float not null,
    required_experience text not null,
    employment_type text not null check (employment_type in ('casual', 'full-time', 'part-time')),
    required_qualification text not null,
    location text not null,
    primary key(id)
)`);

db.run(`
create table if not exists Posts (
    employer_email text references Employers(email),
    job_id serial references Jobs(id),
    primary key(employer_email, job_id)
)`);

db.run(`
create table if not exists Applications (
    id serial,
    cover_letter text,
    resume text not null,
    primary key(id)
)`)

db.run(`
create table if not exists Applies (
    job_seeker_email text references JobSeekers(email),
    application_id serial references Applications(id),
    primary key(job_seeker_email, application_id)
)`);

db.run(`
create table if not exists Skills (
    skill text,
    job_seeker_email serial,
    foreign key (job_seeker_email) references JobSeekers(email),
    primary key (job_seeker_email, skill)
)`);