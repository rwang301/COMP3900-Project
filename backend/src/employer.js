import db from './db.js';
import sendResponse from '../server.js';
import { verifyToken } from './token.js';

export const postJob = (req, res) => {
    verifyToken(req.header('token')).then(user => {
        const { job_title, location, description, employment_type, closing_date, skills } = req.body;
        db.run(`insert into Jobs (job_title, location, description, employment_type, closing_date) values ('${job_title}', '${location}', '${description}', '${employment_type}', '${closing_date}')`);
        db.get('select id from Jobs order by id desc', [], (err, job) => {
            if (err) {
                sendResponse(res, 500, err.message);
            } else {
                db.run(`insert into Posts values ('${user.email}', '${job.id}')`);
                db.run(`insert into Skills (job_id, skill1, skill2, skill3) values ('${job.id}', '${skills[0]}', '${skills[1]}', '${skills[2]}')`);
            }
        });
        sendResponse(res, 200, `${user.name} posted a job`);
    }).catch(({status, message}) => sendResponse(res, status, message));
};

export const getJobs = (req, res) => {
    verifyToken(req.header('token')).then(user => {
        db.all('select job_title, location, description, employment_type, closing_date, skill1, skill2, skill3 from Jobs join Skills on Jobs.id = Skills.job_id;', [], (err, jobs) => {
            if (err) {
                sendResponse(res, 500, err.message);
            } else {
                sendResponse(res, 200, `Here are you jobs\n${jobs}`, jobs);
            }
        })
    }).catch(({status, message}) => sendResponse(res, status, message));
}