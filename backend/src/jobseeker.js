import db from './db.js';
import sendResponse from '../server.js';
import { verifyToken } from './token.js';

export const updateJobSeekerProfile = (req, res) => {
    verifyToken(req.header('token')).then((user) => {
        const { name, password, location, profile, education, skills } = req.body;
        db.run(`UPDATE Users SET name = '${name}', password = '${password}', location = '${location}', profile = '${profile}' WHERE email = '${user.email}'`);
        if (education) db.run(`UPDATE JobSeekers SET education = '${education}' WHERE email = '${user.email}'`);
        db.get(`SELECT email FROM Skills WHERE email = '${user.email}'`, [], (_, email) => { // get all the skills for that job seeker
            if (email) { // if the job seeker has added skills
                db.run(`update Skills set skill1 = ${skills[0] ? `'${skills[0]}'` : null}, skill2 = ${skills[1] ? `'${skills[1]}'` : null}, skill3 = ${skills[2] ? `'${skills[2]}'` : null} where email = '${user.email}'`);
            } else { // if the job seeker just registered for the first time therefore has not added any skills
                db.run(`insert into Skills (email, skill1, skill2, skill3) values ('${user.email}', '${skills[0]}', '${skills[1]}', '${skills[2]}')`);
            }
            db.serialize(() => {
                db.run(`DELETE FROM PotentialJobs WHERE email = '${user.email}'`)
                    .run(`DELETE FROM PotentialJobseekers WHERE job_seeker_email = '${user.email}'`)
                    .all('SELECT job_id, skill1, skill2, skill3 FROM Skills WHERE email IS NULL AND job_id IS NOT NULL', [], (_, jobs) => {
                        for (const job of jobs) {// loop through all the jobs in the database
                            let matches = 0;
                            for (const skill of skills) {// loop through the skills the job seeker just updated
                                if (Object.values(job).includes(skill)) {// if the skill matches with one of the job's required skills
                                    matches++;
                                }
                            }
                            if (matches > 0) {
                                db.get(`SELECT email FROM Posts WHERE id = ${job.job_id}`, [], (_, email) => {// get the email of the employer who posted the job
                                    db.run(`INSERT INTO PotentialJobs VALUES ('${user.email}', '${job.job_id}', ${0}, ${matches})`);
                                    db.get(`SELECT count(j.id) FROM PotentialJobs AS j JOIN Posts AS p ON j.id = p.id WHERE p.email = '${email.email}' AND j.email = '${user.email}'`, (_, count) => {
                                        if (count['count(j.id)'] > 1) {
                                            db.run(`UPDATE PotentialJobSeekers SET matches = ${count['count(j.id)']} WHERE employer_email = '${email.email}' AND job_seeker_email = '${user.email}'`);
                                        } else {
                                            db.run(`INSERT INTO PotentialJobSeekers (employer_email, job_seeker_email, has_swiped, matches) VALUES ('${email.email}', '${user.email}', ${0}, ${count['count(j.id)']})`);
                                        }
                                    });
                                });
                            }
                        }
                    });
            });
            sendResponse(res, 200, `${user.name} updated profile`);
        });
    }).catch(({status, message}) => sendResponse(res, status, message));
};

export const getJobSeekerProfile = (req, res) => {
    verifyToken(req.header('token')).then((user) => {
        db.get(`SELECT u.email, name, password, location, profile, education, skill1, skill2, skill3
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
        db.all(`SELECT j.id, job_title, employment_type, closing_date, location, company, skill1, skill2, skill3
                FROM PotentialJobs AS pj JOIN Jobs AS j on pj.id = j.id
                JOIN Skills AS s ON j.id = s.job_id
                JOIN Posts AS p ON j.id = p.id
                JOIN Employers AS e ON p.email = e.email
                WHERE has_swiped = 0 AND pj.email = '${user.email}'
                ORDER BY pj.matches DESC`,
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
        db.get(`SELECT has_swiped FROM PotentialJobSeekers
                WHERE job_seeker_email = '${user.email}'
                AND employer_email = (SELECT email FROM Posts WHERE id = ${id})`,
        [], (_, { has_swiped }) => {
            if (has_swiped) db.run(`INSERT INTO Matches VALUES ('${user.email}', ${id})`);
        });
        sendResponse(res, 200, `${user.name} has swiped right on job ${id}`);
    }).catch(({status, message}) => sendResponse(res, status, message));
};

export const jobSeekerSwipeLeft = (req, res) => {
    verifyToken(req.header('token')).then((user) => {
        const { id } = req.body;
        db.run(`DELETE FROM PotentialJobs WHERE id = ${id}`);
        sendResponse(res, 200, `${user.name} has swiped left on job ${id}`);
    }).catch(({status, message}) => sendResponse(res, status, message));
};

export const getJobSeekerMatches = (req, res) => {
    verifyToken(req.header('token')).then((user) => {
        db.all(`SELECT u.email, name, u.location, education, skill1, skill2, skill3, job_title
                FROM Matches AS m
                JOIN Jobs AS j ON m.id = j.id
                JOIN Skills AS s ON m.email = s.email
                JOIN JobSeekers AS js ON s.email = js.email
                JOIN Users AS u ON js.email = u.email
                JOIN Posts AS p ON m.id = p.id
                WHERE p.email = '${user.email}'`,
        [], (_, jobSeekers) => {
            sendResponse(res, 200,
                `All the job seekers that match with ${user.name}'s jobs: ${jobSeekers.map(jobSeeker => jobSeeker.name).join(', ')}`,
                jobSeekers,
            );
        });
    }).catch(({status, message}) => sendResponse(res, status, message));
};
