import db from './db.js';
import sendResponse from '../server.js';
import { generateToken } from './token.js';

export const login = (req, res) => {
    const {email, password} = req.body;
    db.all('select * from users', [], (err, users) => {
        if (err) {
            sendResponse(res, 500, err.message);
        } else {
            if (users.length) {// if there are users in the database
                for (const user of users) {
                    if (user.email === email && user.password === password) {
                        db.all('select * from employers', [], (err, employers) => {
                            if (err) {
                                sendResponse(res, 500, err.message);
                                return;
                            } else {
                                const token = generateToken(email);
                                db.run(`update Users set token = '${token}' where email = '${email}'`);
                                for (const employer of employers) {
                                    if (employer.email === email) {
                                        sendResponse(res, 200, 'Successful login as an employer', {'employer': true, 'token': token});
                                        return;
                                    }
                                }
                                sendResponse(res, 200, 'Successful login as a job seeker', {'employer': true, 'token': token});
                            }
                        });
                        return;
                    }
                }
            }
            sendResponse(res, 403, 'User does not exist');
        }
    });
};

export const register = (req, res) => {
    const {name, email, password, employer} = req.body;
    db.get(`select email from users where email = '${email}'`, [], (err, user) => {
        if (err) {
            sendResponse(res, 500, err.message);
        } else {
            if (user) {// if user with email already exists
                sendResponse(res, 409, `${email} already exists`);
            } else {
                const token = generateToken(email);
                db.run(`insert into Users (email, name, password, token) values ('${email}', '${name}', '${password}', '${token}')`);
                if (employer) {
                    db.run(`insert into Employers (email) values ('${email}')`);
                } else {
                    db.run(`insert into JobSeekers (email) values ('${email}')`);
                }
                sendResponse(res, 200, `Inserted ${name} into the database`, {'token': token});
            }
        }
    });
};
