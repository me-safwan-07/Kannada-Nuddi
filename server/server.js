/* This code snippet is a basic setup for a Node.js application using Express framework. Here's a
breakdown of what the code is doing: */
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

import { keys } from './config/keys.js'
import routes from './routes/index.js';
import setupDB from './utils/db.js';

dotenv.config();

const { port } = keys;
const { apiURL } = keys.app;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: false,
    frameguard: true
  })
);
app.use(cors());

// Connect to MongoDB
setupDB();

app.get('/', (req, res) => {
  res.send('Hello world');
})

app.use(`/${apiURL}`, routes);

app.use((err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  const message = err.message || 'Internal server error';
  res.status(statusCode).json({
    success: true,
    statusCode,
    message,
  }) 
});

// chnage the note.js version in vercel to 18x to remove the seveless crash

app.listen(port, () => {
  console.log(
      `Listening on port ${port}. Visit http://localhost:${port}/ in your browser.`
  );
});