import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { login, register } from './src/auth.js';
import { postJob } from './src/employer.js';
import { updateProfile } from './src/jobseeker.js';

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
app.put('/profile/update', updateProfile);
