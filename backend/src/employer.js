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
                                    db.run(`insert into PotentialJobSeekers (employer_email, job_seeker_email, has_swiped) select '${user.email}', '${jobSeeker.email}', ${0} where not exists (select 1 from PotentialJobseekers where employer_email = '${user.email}' and job_seeker_email = '${jobSeeker.email}')`);
                                    return;
                                }
                            }
                        }
                    }
                });
            }
            sendResponse(res, 200, `${user.name} posted a job`, {id: job.id});
        });
    }).catch(({status, message}) => sendResponse(res, status, message));
};

export const updateJob = (req, res) => {
    deleteJob(req, res);
    postJob(req, res);
};

export const deleteJob = (req, res) => {
    verifyToken(req.header('token')).then(user => {
        const { id } = req.body;
        db.serialize(() => {
            db.run(`delete from Jobs where id = ${id}`)
                .run(`delete from Skills where job_id = ${id}`)
                .run(`delete from PotentialJobs where id = ${id}`)
                .all(`SELECT email, skill1, skill2, skill3 FROM Skills AS s
                      JOIN PotentialJobSeekers AS p
                      ON s.email = p.job_seeker_email
                      WHERE p.employer_email = '${user.email}'`,
                [], (err, jobseekers) => {
                    if (err) {
                        sendResponse(res, 500, err.message);
                    } else {
                        db.all(`SELECT skill1, skill2, skill3 FROM Skills AS s
                                JOIN Jobs AS j ON j.id = s.job_id
                                JOIN Posts AS p on p.id = j.id
                                WHERE p.email = '${user.email}'`,
                        [], (err, jobs) => {
                            if (err) {
                                sendResponse(res, 500, err.message);
                            } else {
                                const skills = jobs.reduce((a, c) => a.concat(Object.values(c)), []);
                                if (jobseekers && jobs) {
                                    jobseekers.forEach(({ email, ...jobseeker }) => {
                                        if (!Object.values(jobseeker).some((skill) => skills.includes(skill))) db.run(`DELETE FROM PotentialJobSeekers WHERE job_seeker_email = '${email}'`);
                                    });
                                }
                            }
                        });
                    }
                });
            sendResponse(res, 200, `${user.name} deleted job ${id}`);
        });
    }).catch(({status, message}) => sendResponse(res, status, message));
};

export const getEmployerProfile = (req, res) => {
    verifyToken(req.header('token')).then(user => {
        const { email, name, location, profile } = user;
        db.all(`SELECT j.id, job_title, location, description, employment_type, closing_date, skill1, skill2, skill3,
                company FROM Employers As e
                LEFT JOIN Posts AS p ON e.email = p.email
                LEFT JOIN Jobs AS j ON p.id = j.id
                LEFT JOIN Skills AS s ON j.id = s.job_id
                WHERE e.email = '${email}'`,
        [], (err, jobs) => {
            if (err) {
                sendResponse(res, 500, err.message);
            } else {
                sendResponse(res, 200,
                    `Here are ${name}'s jobs: ${jobs.map(job => job.job_title)}`,
                    {
                        email,
                        name,
                        location,
                        profile,
                        company: jobs[0].company,
                        jobs: jobs.filter((job) => job.id).map((job) => {
                            const { skill1, skill2, skill3, ...info } = job;
                            info.skills = [skill1, skill2, skill3];
                            return info;
                        }),
                    },
                );
            }
        });
    }).catch(({status, message}) => sendResponse(res, status, message));
};

export const updateEmployerProfile = (req, res) => {
    verifyToken(req.header('token')).then(user => {
        const { name, password, location, profile, company } = req.body;
        db.run(`update Users set name = '${name}', password = '${password}', location = '${location}' profile = '${profile} where email = '${user.email}'`);
        if (company) db.run(`update Employers set company = '${company}' where email = '${user.email}'`);
        sendResponse(res, 200, `${user.name} updated profile`);
    }).catch(({status, message}) => sendResponse(res, status, message));
};

export const getPotentialJobSeekers = (req, res) => {
    verifyToken(req.header('token')).then(user => {
        db.all(`SELECT u.email, name, location, education, skill1, skill2, skill3, has_swiped
                from PotentialJobSeekers AS p
                JOIN Skills AS s ON p.job_seeker_email = s.email
                JOIN JobSeekers AS j ON s.email = j.email
                JOIN Users AS u ON j.email = u.email
                WHERE has_swiped = 0 AND p.employer_email = '${user.email}'`,
        [], (err, jobSeekers) => {
            if (err) {
                sendResponse(res, 500, err.message);
            } else {
                sendResponse(res, 200,
                    `All the job seekers that match with ${user.name}'s jobs: ${jobSeekers.map(jobSeeker => jobSeeker.name).join(', ')}`,
                    jobSeekers,
                );
            }
        });
    }).catch(({status, message}) => sendResponse(res, status, message));
};

export const employerSwipeRight = (req, res) => {
    verifyToken(req.header('token')).then(user => {
        const { email } = req.body;
        db.run(`UPDATE PotentialJobseekers SET has_swiped = 1 WHERE employer_email = '${user.email}' AND job_seeker_email = '${email}'`);
        sendResponse(res, 200, `${user.name} has swiped right on job ${id}`);
    }).catch(({status, message}) => sendResponse(res, status, message));
};

export const employerSwipeLeft = (req, res) => {
    verifyToken(req.header('token')).then((user) => {
        const { email } = req.body;
        db.run(`DELETE FROM PotentialJobseekers WHERE job_seeker_email = '${email}'`);
        sendResponse(res, 200, `${user.name} has swiped left on job ${id}`);
    }).catch(({status, message}) => sendResponse(res, status, message));
};
