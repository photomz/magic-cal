import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

import textEndpoint from './routes/text.js';

const app = express();
const port = 3000;

// Rate limiting setup
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// Apply to all requests
app.use(limiter);

app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to this API!');
});

// Text generation endpoint
// /api/generate-link?prompt=birthday+party+at+10am
app.get('/api/generate-link', textEndpoint);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
