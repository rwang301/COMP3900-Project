import { db, sendResponse } from '../server.js';
import { generateToken } from './jwt.js';

export const login = (req, res) => {
    const {email, password} = req.body;
    const sql = 'select * from users';
    db.all(sql, [], (err, users) => {
        if (err) {
            sendResponse(res, 500, err.message);
        } else {
            if (users.length) {// if there are users in the database
                for (const user of users) {
                    if (user.email === email && user.password === password) {
                        const query = 'select * from employers';
                        db.all(query, [], (err, employers) => {
                            if (err) {
                                sendResponse(res, 500, err.message);
                                return;
                            } else {
                                const token = generateToken(email);
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
}

export const register = (req, res) => {
    const {name, email, password, employer} = req.body;
    const sql = `select email from users where email = '${email}'`;
    db.get(sql, [], (err, user) => {
        if (err) {
            sendResponse(res, 500, err.message);
        } else {
            if (user) {// if user with email already exists
                sendResponse(res, 409, `${email} already exists`);
            } else {
                const token = generateToken(email);
                db.run(`insert into Users values ('${name}', '${email}', '${password}', '${token}')`);
                db.run(`insert into ${employer ? 'Employers' : 'JobSeekers'} values ('${email}')`);
                sendResponse(res, 200, `Inserted ${name} into the database`, {'token': token});
            }
        }
    });
}