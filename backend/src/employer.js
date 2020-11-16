import db from './db.js';
import sendResponse from '../server.js';
import { verifyToken } from './token.js';

export const postJob = (req, res) => {
    verifyToken(req.header('token'))
        .then((user) => post(user, req.body))
        .then(({ status, message, data }) => sendResponse(res, status, message, data))
        .catch(({ status, message }) => sendResponse(res, status, message));
};

export const deleteJob = (req, res) => {
    verifyToken(req.header('token'))
        .then((user) => remove(user, req.body))
        .then(({ status, message, data }) => sendResponse(res, status, message, data))
        .catch(({ status, message }) => sendResponse(res, status, message));
};

export const updateJob = (req, res) => {
    verifyToken(req.header('token'))
        .then((user) => remove(user, req.body).then(() => post(user, req.body)))
        .then(({ status }) => sendResponse(res, status, message, data))
        .catch(({ status, message }) => sendResponse(res, status, message));
};

const post = (user, { job_title, location, description, employment_type, closing_date, skills }) => {
    return new Promise((_, resolve) => {
        db.run(`insert into Jobs (job_title, location, description, employment_type, closing_date) values ('${job_title}', '${location}', '${description}', '${employment_type}', '${closing_date}')`);
        db.get('select id from Jobs order by id desc', [], (_, job) => {
            db.run(`insert into Posts values ('${user.email}', '${job.id}')`);
            db.run(`insert into Skills (job_id, skill1, skill2, skill3) values ('${job.id}', '${skills[0]}', '${skills[1]}', '${skills[2]}')`);
            db.all('select email, skill1, skill2, skill3 from Skills where email is not null and job_id is null', [], (_, jobSeekers) => {
                for (const jobSeeker of jobSeekers) {
                    let matches = 0;
                    for (const skill of skills) {
                        if (Object.values(jobSeeker).includes(skill)) {
                            matches++;
                        }
                    }
                    if (matches > 0) {
                        db.run(`INSERT INTO PotentialJobs (email, id, has_swiped, matches) VALUES ('${jobSeeker.email}', '${job.id}', ${0}, ${matches})`);
                        db.get(`SELECT count(j.id) AS count FROM PotentialJobs AS j JOIN Posts AS p ON j.id = p.id WHERE p.email = '${user.email}' AND j.email = '${jobSeeker.email}'`, (_, { count }) => {
                            if (count > 1) {
                                db.run(`UPDATE PotentialJobSeekers SET matches = ${count} WHERE employer_email = '${user.email}' AND job_seeker_email = '${jobSeeker.email}'`);
                            } else {
                                db.run(`INSERT INTO PotentialJobSeekers (employer_email, job_seeker_email, has_swiped, matches) VALUES ('${user.email}', '${jobSeeker.email}', ${0}, ${count})`);
                            }
                        });
                    }
                }
            });
            resolve({ status: 200, message: `${user.name} posted a job`, data: {id: job.id} });
        });
    });
};

const remove = (user, { id }) => {
    return new Promise((_, resolve) => {
        db.serialize(() => {
            db.run(`delete from Jobs where id = ${id}`)
                .run(`delete from Skills where job_id = ${id}`)
                .run(`delete from PotentialJobs where id = ${id}`)
                .all(`SELECT email, skill1, skill2, skill3 FROM Skills AS s
                      JOIN PotentialJobSeekers AS p
                      ON s.email = p.job_seeker_email
                      WHERE p.employer_email = '${user.email}'`,
                [], (_, jobseekers) => {
                    db.all(`SELECT skill1, skill2, skill3 FROM Skills AS s
                            JOIN Jobs AS j ON j.id = s.job_id
                            JOIN Posts AS p on p.id = j.id
                            WHERE p.email = '${user.email}'`,
                    [], (_, jobs) => {
                        const skills = jobs.reduce((a, c) => a.concat(Object.values(c)), []);
                        if (jobseekers && jobs) {
                            jobseekers.forEach(({ email, ...jobseeker }) => {
                                if (!Object.values(jobseeker).some((skill) => skills.includes(skill))) {
                                    db.run(`DELETE FROM PotentialJobSeekers WHERE job_seeker_email = '${email}'`);
                                }
                            });
                        }
                    });
                });
            resolve({ status: 200, message: `${user.name} deleted job ${id}` });
        });
    });
};

export const getEmployerProfile = (req, res) => {
    verifyToken(req.header('token')).then((user) => {
        const { email, name, password, location, profile } = user;
        db.all(`SELECT j.id, job_title, location, description, employment_type, closing_date, skill1, skill2, skill3,
                company FROM Employers As e
                LEFT JOIN Posts AS p ON e.email = p.email
                LEFT JOIN Jobs AS j ON p.id = j.id
                LEFT JOIN Skills AS s ON j.id = s.job_id
                WHERE e.email = '${email}'`,
        [], (_, jobs) => {
            sendResponse(res, 200,
                `Here are ${name}'s jobs: ${jobs.map((job) => job.job_title)}`,
                {
                    email,
                    name,
                    password,
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
        });
    }).catch(({status, message}) => sendResponse(res, status, message));
};

export const updateEmployerProfile = (req, res) => {
    verifyToken(req.header('token')).then((user) => {
        const { name, password, location, profile, company } = req.body;
        db.run(`update Users set name = '${name}', password = '${password}', location = '${location}', profile = '${profile}' where email = '${user.email}'`);
        if (company) db.run(`update Employers set company = '${company}' where email = '${user.email}'`);
        sendResponse(res, 200, `${user.name} updated profile`);
    }).catch(({status, message}) => sendResponse(res, status, message));
};

export const getPotentialJobSeekers = (req, res) => {
    verifyToken(req.header('token')).then((user) => {
        db.all(`SELECT u.email, name, location, profile, education, skill1, skill2, skill3
                FROM PotentialJobSeekers AS p
                JOIN Skills AS s ON p.job_seeker_email = s.email
                JOIN JobSeekers AS j ON s.email = j.email
                JOIN Users AS u ON j.email = u.email
                WHERE has_swiped = 0 AND p.employer_email = '${user.email}'
                ORDER BY p.matches DESC`,
        [], (_, jobSeekers) => {
            sendResponse(res, 200,
                `All the job seekers that match with ${user.name}'s jobs: ${jobSeekers.map((jobSeeker) => jobSeeker.name).join(', ')}`,
                jobSeekers.map((jobSeeker) => {
                  const { profile, ...info } = jobSeeker;
                  return { profile: profile === 'undefined' ? '' : profile, ...info };
                }),
            );
        });
    }).catch(({status, message}) => sendResponse(res, status, message));
};

export const employerSwipeRight = (req, res) => {
    verifyToken(req.header('token')).then((user) => {
        const { email } = req.body;
        db.run(`UPDATE PotentialJobseekers SET has_swiped = 1 WHERE employer_email = '${user.email}' AND job_seeker_email = '${email}'`);
        db.all(`SELECT j.id, has_swiped FROM Posts AS p
                JOIN PotentialJobs AS j ON p.id = j.id
                WHERE p.email = '${user.email}'`,
        [], (_, jobs) => {
            jobs.forEach((job) => {
                if (job.has_swiped) db.run(`INSERT INTO Matches VALUES ('${email}', ${job.id})`);
            });
        });
        sendResponse(res, 200, `${user.name} has swiped right on jobseeker ${email}`);
    }).catch(({status, message}) => sendResponse(res, status, message));
};

export const employerSwipeLeft = (req, res) => {
    verifyToken(req.header('token')).then((user) => {
        const { email } = req.body;
        db.run(`DELETE FROM PotentialJobseekers WHERE job_seeker_email = '${email}'`);
        sendResponse(res, 200, `${user.name} has swiped left on jobseeker ${email}`);
    }).catch(({status, message}) => sendResponse(res, status, message));
};

export const getEmployerMatches = (req, res) => {
    verifyToken(req.header('token')).then((user) => {
        db.all(`SELECT u.email, name, u.location, profile, education, skill1, skill2, skill3, job_title
                FROM Matches AS m
                JOIN Jobs AS j ON m.id = j.id
                JOIN Skills AS s ON m.email = s.email
                JOIN JobSeekers AS js ON s.email = js.email
                JOIN Users AS u ON js.email = u.email
                JOIN Posts AS p ON m.id = p.id
                WHERE p.email = '${user.email}'`,
        [], (_, matches) => {
            sendResponse(res, 200,
                `All the job seekers that match with ${user.name}'s jobs: ${matches.map((match) => match.name).join(', ')}`,
                matches.map((match => {
                    const { skill1, skill2, skill3, ...info } = match;
                    return { info, skills: [skill1, skill2, skill3] };
                })),
            );
        });
    }).catch(({status, message}) => sendResponse(res, status, message));
};
