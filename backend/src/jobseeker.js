import db from './db.js';
import sendResponse from '../server.js';
import { verifyToken } from './token.js';

export const updateProfile = (req, res) => {
    verifyToken(req.header('token')).then(user => {
        const { name, password, location, education, skills } = req.body;
        db.run(`update Users set name = '${name}', password = '${password}', location = '${location}' where email = '${user.email}'`);
        if (education) db.run(`update JobSeekers set education = '${education}' where email = '${user.email}'`);
        db.get(`select email from Skills where email = '${user.email}'`, [], (err, email) => {
            if (err) {
                sendResponse(res, 500, err.message);
            } else {
                if (email) {
                    db.run(`update Skills set skill1 = ${skills[0] ? `'${skills[0]}'` : null}, skill2 = ${skills[1] ? `'${skills[1]}'` : null}, skill3 = ${skills[2] ? `'${skills[2]}'` : null}`);
                } else {
                    db.run(`insert into Skills (email, skill1, skill2, skill3) values ('${user.email}', '${skills[0]}', '${skills[1]}', '${skills[2]}')`);
                }
                db.all('select job_id, skill1, skill2, skill3 from Skills where email is null and job_id is not null', [], (err, jobs) => {
                    if (err) {
                        sendResponse(res, 500, err.message);
                    } else {
                        for (const job of jobs) {// loop through all the jobs in the database
                            db.get(`select email from Posts where id = ${job.job_id}`, [], (err, email) => {// get the email of the employer who posted the job
                                if (err) {
                                    sendResponse(res, 500, err.message);
                                } else {
                                    for (const skill of skills) {// loop through the skills the job seeker just updated
                                        if (Object.values(job).includes(skill)) {// if the skill matches with one of the job's required skills
                                            db.run(`insert into PotentialJobs values ('${user.email}', '${job.job_id}', ${0})`);
                                            db.run(`insert into PotentialJobSeekers values ('${email.email}', '${user.email}', ${0})`);
                                            sendResponse(res, 200, `${user.name} updated profile`);
                                            return;
                                        }
                                    }
                                }
                            });
                        }
                    }
                });
            }
            sendResponse(res, 200, `${user.name} updated profile`);
        });
    }).catch(({status, message}) => sendResponse(res, status, message));
};

export const getProfile = (req, res) => {
    verifyToken(req.header('token')).then(user => {
        db.get(`select education, skill1, skill2, skill3 from JobSeekers as j join Skills as s on j.email = s.email where j.email = '${user.email}'`, [], (err, info) => {
            if (err) {
                sendResponse(res, 500, err.message);
            } else {
                if (info) {
                    const {education, skill1, skill2, skill3} = info;
                    sendResponse(res, 200, `${user.name}'s skills are ${skill1}, ${skill2}, ${skill3}`, { education, skills: [skill1, skill2, skill3] });
                } else {
                    sendResponse(res, 200, `${user.name} has no skills`, { education: '', skills: ['', '', ''] });
                }
            }
        });
    }).catch(({status, message}) => sendResponse(res, status, message));
};
