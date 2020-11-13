import db from './db.js';
import sendResponse from '../server.js';
import { verifyToken } from './token.js';

export const updateJobSeekerProfile = (req, res) => {
    verifyToken(req.header('token')).then((user) => {
        const { name, password, location, education, skills } = req.body;
        db.run(`update Users set name = '${name}', password = '${password}', location = '${location}' where email = '${user.email}'`);
        if (education) db.run(`UPDATE JobSeekers SET education = '${education}' WHERE email = '${user.email}'`);
        db.get(`SELECT email FROM Skills WHERE email = '${user.email}'`, [], (err, email) => {
            if (err) {
                sendResponse(res, 500, err.message);
            } else {
                if (email) {
                    db.run(`update Skills set skill1 = ${skills[0] ? `'${skills[0]}'` : null}, skill2 = ${skills[1] ? `'${skills[1]}'` : null}, skill3 = ${skills[2] ? `'${skills[2]}'` : null} where email = '${user.email}'`);
                } else {
                    db.run(`insert into Skills (email, skill1, skill2, skill3) values ('${user.email}', '${skills[0]}', '${skills[1]}', '${skills[2]}')`);
                }
                db.parallelize(() => {
                    db.run(`DELETE FROM PotentialJobs WHERE email = '${user.email}'`).run(`delete from PotentialJobseekers where job_seeker_email = '${user.email}'`, (err) => {
                        if (err) {
                            sendResponse(res, 500, err.message);
                        } else {
                            db.all('SELECT job_id, skill1, skill2, skill3 FROM Skills WHERE email IS NULL AND job_id IS NOT NULL', [], (err, jobs) => {
                                if (err) {
                                    sendResponse(res, 500, err.message);
                                } else {
                                    for (const job of jobs) {// loop through all the jobs in the database
                                        db.get(`SELECT email FROM Posts WHERE id = ${job.job_id}`, [], (err, email) => {// get the email of the employer who posted the job
                                            if (err) {
                                                sendResponse(res, 500, err.message);
                                            } else {
                                                for (const skill of skills) {// loop through the skills the job seeker just updated
                                                    if (Object.values(job).includes(skill)) {// if the skill matches with one of the job's required skills
                                                        db.run(`INSERT INTO PotentialJobs VALUES ('${user.email}', '${job.job_id}', ${0})`);
                                                        db.run(`INSERT INTO PotentialJobSeekers (employer_email, job_seeker_email, has_swiped)
                                                                SELECT '${email.email}', '${user.email}', ${0} WHERE NOT EXISTS (SELECT 1
                                                                    FROM PotentialJobseekers WHERE employer_email = '${email.email}'
                                                                    AND job_seeker_email = '${user.email}'
                                                                )`);
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
            sendResponse(res, 200, `${user.name} updated profile`);
        });
    }).catch(({status, message}) => sendResponse(res, status, message));
};

export const getJobSeekerProfile = (req, res) => {
    verifyToken(req.header('token')).then((user) => {
        db.get(`SELECT u.email, name, password, location, education, skill1, skill2, skill3
                FROM JobSeekers AS j
                LEFT JOIN Skills AS s ON j.email = s.email
                JOIN Users AS u ON u.email = j.email
                WHERE j.email = '${user.email}'`,
        [], (err, info) => {
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

export const getPotentialJobs = (req, res) => {
    verifyToken(req.header('token')).then((user) => {
        db.all(`SELECT job_title, employment_type, closing_date, location, company, skill1, skill2, skill3, has_swiped
                FROM PotentialJobs AS pj JOIN Jobs AS j on pj.id = j.id
                JOIN Skills AS s ON j.id = s.job_id
                JOIN Posts AS p ON j.id = p.id
                JOIN Employers AS e ON p.email = e.email
                WHERE pj.email = '${user.email}'`,
        [], (err, jobs) => {
            if (err) {
                sendResponse(res, 500, err.message);
            } else {
                sendResponse(res, 200,
                    `All the jobs that match with ${user.name}'s skills: ${jobs.map((job) => job.job_title).join(', ')}`,
                    jobs,
                );
            }
        });
    }).catch(({status, message}) => sendResponse(res, status, message));
};

export const jobSeekerSwipeRight = (req, res) => {
    verifyToken(req.header('token')).then((user) => {
        const { id } = req.body;
        db.run(`UPDATE PotentialJobs SET has_swiped = 1 WHERE email = '${user.email}' AND id = ${id}`);
        sendResponse(res, 200, `${user.name} has swiped right on job ${id}`);
    }).catch(({status, message}) => sendResponse(res, status, message));
};

export const jobSeekerSwipeLeft = (req, res) => {
    verifyToken(req.header('token')).then((user) => {
    }).catch(({status, message}) => sendResponse(res, status, message));
};
