import db from './db.js';
import sendResponse from '../server.js';
import { verifyToken } from './token.js';

export const updateProfile = (req, res) => {
    verifyToken(req.header('token')).then(user => {
        const { email, name, password, location, education, skills } = req.body;
        db.run(`update Users set ${name ? `name = ${name},` : ''} ${password ? `password = ${password},` : ''} ${location ? `location = ${location},` : ''} where email = ${email}`);
        if (education) db.run(`update JobSeekers set education=${education} where email = ${email}`);
        db.get(`select job_seeker_email from Skills where job_seeker_email = ${email}`, [], (err, row) => {
            if (err){
                sendResponse(res, 500, err.message);
            } else {
                if (row) {
                    db.run(`update Skills set skill1 = ${skills[0]}, skill2 = ${skills[1]}, skill3 = ${skills[2]}`);
                } else {
                    db.run(`insert into Skills (skill1, skill2, skill3) values ('${skills[0]}', '${skills[1]}', '${skills[2]}')`);
                }
            }
        });
        sendResponse(res, 200, `${name} updated profile`);
    }).catch(({status, message}) => sendResponse(res, status, message));
};
