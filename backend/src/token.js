import jwt from 'jsonwebtoken';

import db from './db.js';
import sendResponse from '../server.js';

const SECRET = 'kai-will-make-tony-rich';
export const generateToken = (email) => jwt.sign({email}, SECRET, {algorithm: 'HS256'});
export const verifyToken = (token, res) => {
    try {
        const email = jwt.verify(token, SECRET).email;
        db.get(`select email, name from Users where token = '${token}'`, [], (err, user) => {
            if (err) {
                sendResponse(res, 500, err.message);
            } else if (user && email === user.email) {
                return user;
            } else {
                sendResponse(res, 403, 'Invalid token');
            }
        });
    } catch (error) {
        sendResponse(res, 403, error);
    }
};
