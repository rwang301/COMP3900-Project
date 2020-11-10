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
                                    return;
                                }
                            }
                        }
                        sendResponse(res, 200, `${user.name} posted a job`);
                    }
                });
            }
        });
    }).catch(({status, message}) => sendResponse(res, status, message));
};

export const getJobs = (req, res) => {
    verifyToken(req.header('token')).then(user => {
        db.all('select j.id, job_title, location, description, employment_type, closing_date, skill1, skill2, skill3 from Jobs as j join Skills as s on j.id = s.job_id;', [], (err, jobs) => {
            if (err) {
                sendResponse(res, 500, err.message);
            } else {
                sendResponse(res, 200,
`Here are ${user.name}'s jobs
${jobs.map(job => job.job_title)}`,
                jobs.map((job) => {
                    const newJob = job;
                    newJob.skills = [job.skill1, job.skill2, job.skill3];
                    delete newJob['skill1'];
                    delete newJob['skill2'];
                    delete newJob['skill3'];
                    return newJob;
                }));
            }
        });
    }).catch(({status, message}) => sendResponse(res, status, message));
};

export const updateJob = (req, res) => {
    verifyToken(req.header('token')).then(user => {
        const { id, job_title, location, description, employment_type, closing_date, skills } = req.body;
        db.run(`update Skills set skill1 = '${skills[0]}', skill2 = '${skills[1]}', skill3 = '${skills[2]}' where id = ${id}`);
        db.run(`update Jobs set job_title = '${job_title}', location = '${location}', description = '${description}', employment_type = '${employment_type}', closing_date = '${closing_date}' where id = ${id}`);
        sendResponse(res, 200, `${user.name} updated job ${job_title}`);
    }).catch(({status, message}) => sendResponse(res, status, message));
};

export const deleteJob = (req, res) => {
    verifyToken(req.header('token')).then(user => {
        const { id, job_title, location, description, employment_type, closing_date, skills } = req.body;
        db.run(`update Skills set skill1 = '${skills[0]}', '${skills[1]}', '${skills[2]}' where id = ${id}`);
        db.run(`update Jobs set job_title = '${job_title}', location = '${location}', description = '${description}', employment_type = '${employment_type}', closing_date = '${closing_date}' where id = ${id}`);
        sendResponse(res, 200, `${user.name} updated job ${job_title}`);
    }).catch(({status, message}) => sendResponse(res, status, message));
};

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
                sendResponse(res, 200,
`Here are all the job seekers that match with ${user.name}'s jobs
${jobSeekers.map(jobSeeker => jobSeeker.name).join(', ')}`,
                jobSeekers);
            }
        });
    }).catch(({status, message}) => sendResponse(res, status, message));
};
