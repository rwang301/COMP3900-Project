import db from './db.js';
import sendResponse from '../server.js';
import { verifyToken } from './token.js';

export const sendApplication = (req, res) => {
    const { coverLetter, resume } = req.body;
    const token = req.header('token');
    const email = verifyToken(token);
    if (email) {
        db.get(`select email, name from Users where token = '${token}'`, [], (err, user) => {
            if (err) {
                sendResponse(res, 500, err.message);
            } else if (user && email === user.email) {
                db.run(`insert into Jobs (job_title, location, description, employment_type, closing_date) values ('${job_title}', '${location}', '${description}', '${employment_type}', '${closing_date}')`);
                db.get('select id from Jobs order by id desc', [], (err, job) => {
                    if (err) {
                        sendResponse(res, 500, err.message);
                    } else {
                        db.run(`insert into Posts values ('${user.email}', '${job.id}')`);
                    }
                });
                sendResponse(res, 200, `${user.name} posted a job`);
            } else {
                sendResponse(res, 403, 'Invalid token');
            }
        });
    } else {
        sendResponse(res, 403, 'Invalid token');
    }
};
