import { db, sendResponse } from '../server.js';
import { verifyToken } from './jwt.js';

export const postJob = (req, res) => {
    const { job_title, location, description, employment_type, closing_date } = req.body;
    const token = req.header('token');
    const email = verifyToken(token);
    if (email) {
        db.run(`insert into Jobs (job_title, location, description, employment_type, closing_date) values ('${job_title}', '${location}', '${description}', '${employment_type}', '${closing_date}')`);
        db.get('select id from Jobs order by id desc', [], (err, job) => {
            if (err) {
                sendResponse(res, 500, err.message);
            } else {
                db.run(`insert into Posts values ('${email}', '${job.id}')`);
                sendResponse(res, 200, 'A job is posted successfully');
            }
        });
    } else {
        sendResponse(res, 403, 'Invalid token');
    }
}