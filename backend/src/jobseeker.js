import db from './db.js';
import sendResponse from '../server.js';
import { verifyToken } from './token.js';

export const updateJobSeekerProfile = (req, res) => {
    verifyToken(req.header('token')).then(user => {
        const { name, password, location, education, skills } = req.body;
        db.run(`update Users set name = '${name}', password = '${password}', location = '${location}' where email = '${user.email}'`);
        if (education) db.run(`update JobSeekers set education = '${education}' where email = '${user.email}'`);
        db.get(`select email from Skills where email = '${user.email}'`, [], (err, email) => {
            if (err) {
                sendResponse(res, 500, err.message);
            } else {
                if (email) {
                    db.run(`update Skills set skill1 = ${skills[0] ? `'${skills[0]}'` : null}, skill2 = ${skills[1] ? `'${skills[1]}'` : null}, skill3 = ${skills[2] ? `'${skills[2]}'` : null} where email = '${user.email}'`);
                } else {
                    db.run(`insert into Skills (email, skill1, skill2, skill3) values ('${user.email}', '${skills[0]}', '${skills[1]}', '${skills[2]}')`);
                }
                db.parallelize(() => {
                    db.run(`delete from PotentialJobs where email = '${user.email}'`).run(`delete from PotentialJobseekers where job_seeker_email = '${user.email}'`, (err) => {
                        if (err) {
                            sendResponse(res, 500, err.message);
                        } else {
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
                                                        db.run(`insert into PotentialJobSeekers (employer_email, job_seeker_email, has_swiped) select '${email.email}', '${user.email}', ${0} where not exists (select 1 from PotentialJobseekers where employer_email = '${email.email}' and job_seeker_email = '${user.email}')`);
                                                    }
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    });
                });
            }
            sendResponse(res, 200, `${user.name} updated profile`, {});
        });
    }).catch(({status, message}) => sendResponse(res, status, message));
};

export const getJobSeekerProfile = (req, res) => {
    verifyToken(req.header('token')).then(user => {
        db.get(`select u.email, name, password, location, education, skill1, skill2, skill3 from JobSeekers as j left join Skills as s on j.email = s.email join Users as u on u.email = j.email where j.email = '${user.email}'`, [], (err, info) => {
            if (err) {
                sendResponse(res, 500, err.message);
            } else {
                if (info) {
                    const { email, name, password, location, education, skill1, skill2, skill3} = info;
                    sendResponse(res, 200, `${user.name}'s skills are ${skill1}, ${skill2}, ${skill3}`, { email, name, password, location, education, skills: [skill1, skill2, skill3] });
                } else {
                    sendResponse(res, 400, 'No such user');
                }
            }
        });
    }).catch(({status, message}) => sendResponse(res, status, message));
};
