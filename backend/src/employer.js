import { db, sendResponse } from '../server.js';

export const postJob = (req, res) => {
    const { job_title, location, description, employment_type, closing_date } = req.body;
    console.log(req.body);
    db.run(`insert into Jobs (job_title, location, description, employment_type, closing_date) values ('${job_title}', '${location}', '${description}', '${employment_type}', '${closing_date}')`);
    let sql = `select id from Jobs order by id desc`;
    db.get(sql, [], (err, row) => {
        if (err) {
            sendResponse(res, 500, err.message);
        } else {
            const { token } = req.header;
            console.log(req.header);
            console.log(token);
            sql = `select email from Users where token = '${token}'`
            db.get(sql, [], (err, row) => {
                if (err) {
                    sendResponse(res, 500, err,message);
                } else {
                    console.log(row);
                    //db.run(`insert into Posts values ('${employer_email}', '${row.job_id}')`);
                }
            })
        }
    });
}