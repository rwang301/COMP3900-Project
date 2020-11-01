import db from './db.js';
import sendResponse from '../server.js';
import { verifyToken } from './token.js';

export const postJob = (req, res) => {
    const user = verifyToken(req.header('token'))
        .then(user => {
            const { job_title, location, description, employment_type, closing_date } = req.body;
            db.run(`insert into Jobs (job_title, location, description, employment_type, closing_date) values ('${job_title}', '${location}', '${description}', '${employment_type}', '${closing_date}')`);
            db.get('select id from Jobs order by id desc', [], (err, job) => {
                if (err) {
                    sendResponse(res, 500, err.message);
                } else {
                    db.run(`insert into Posts values ('${user.email}', '${job.id}')`);
                }
            });
            sendResponse(res, 200, `${user.name} posted a job`);
        })
        .catch(({status, message}) => sendResponse(res, status, message));
};
