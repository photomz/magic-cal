import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

import linkEndpoint from './link.js';

const app = express();

// Rate limit apply to all requests
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(cors());

app.get('/', (req, res) => {
  res.send("I'm a calendar teapot!");
});

// /link?prompt=birthday+party+at+10am&date=21+Feb+2024,+9:30pm
app.get('/link', linkEndpoint);

app.listen(10000, '0.0.0.0', () => {
  console.log(`Server running http://0.0.0.0:10000`);
});
