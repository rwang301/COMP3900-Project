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
                db.all('select email, skill1, skill2, skill3 from Skills where email is not null and job_id is null', [], (err, jobSeekers) => {
                    if (err) {
                        sendResponse(res, 500, err.message);
                    } else {
                        for (const jobSeeker of jobSeekers) {
                            for (const skill of skills) {
                                if (Object.values(jobSeeker).includes(skill)) {
                                    db.run(`insert into PotentialJobs values ('${jobSeeker.email}', '${job.id}', ${0})`);
                                    sendResponse(res, 200, `${user.name} posted a job`);
                                    return;
                                }
                            }
                        }
                    }
                });
            }
        });
    }).catch(({status, message}) => sendResponse(res, status, message));
};

export const getJobs = (req, res) => {
    verifyToken(req.header('token')).then(user => {
        db.all('select job_title, location, description, employment_type, closing_date, skill1, skill2, skill3 from Jobs join Skills on Jobs.id = Skills.job_id;', [], (err, jobs) => {
            if (err) {
                sendResponse(res, 500, err.message);
            } else {
                sendResponse(res, 200, `Here are ${user.name}'s jobs\n${jobs}`, jobs);
            }
        });
    }).catch(({status, message}) => sendResponse(res, status, message));
}

export const getPotentialJobSeekers = (req, res) => {
    verifyToken(req.header('token')).then(user => {
        db.all(`select u.email, name, location, education, skill1, skill2, skill3
                from PotentialJobSeekers as p
                join Skills as s on p.job_seeker_email = s.email
                join JobSeekers as j on s.email = j.email
                join Users as u on j.email = u.email;`,
                [], (err, jobSeekers) => {
            if (err) {
                sendResponse(res, 500, err.message);
            } else {
                console.log(jobSeekers);
                sendResponse(res, 200, `Here are all the job seekers that match with ${user.name} jobs\n${jobSeekers}`, jobSeekers);
            }
        });
    }).catch(({status, message}) => sendResponse(res, status, message));
}