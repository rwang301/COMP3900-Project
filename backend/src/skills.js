import db from './db.js';
import sendResponse from '../server.js';

export default (_, res) => {
    db.all('SELECT skill FROM SkillsList', [], (_, skills) => {
        sendResponse(res, 200, '', skills.map((skill) => skill.skill));
    });
}
