import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { login, register } from './src/auth.js';
import { postJob, getJobs } from './src/employer.js';
import { updateProfile, getSkills } from './src/jobseeker.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 8000;
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));

export default (response, status, message, data) => {
    response.status(status).send(data);
    console.log(message);
};

app.post('/auth/login', login);
app.post('/auth/register', register);
app.post('/post/job', postJob);
app.get('/profile/jobs', getJobs);
app.put('/profile/update', updateProfile);
app.get('/profile/skills', getSkills);