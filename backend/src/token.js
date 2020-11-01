import jwt from 'jsonwebtoken';

import db from './db.js';

const SECRET = 'kai-will-make-tony-rich';
export const generateToken = (email) => jwt.sign({email}, SECRET, {algorithm: 'HS256'});
export const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        try {
            const email = jwt.verify(token, SECRET).email;
            db.get(`select email, name from Users where token = '${token}'`, [], (err, user) => {
                if (err) {
                    reject({'status': 500, 'message': err.message});
                } else if (user && email === user.email) {
                    resolve(user);
                } else {
                    reject({'status': 403, 'message': 'Invalid token'});
                }
            });
        } catch (error) {
            reject({'status': 403, 'message': error.message});
        }
    });
};
