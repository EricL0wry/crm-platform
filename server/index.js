require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.post('/api/login', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (email.trim() === '' || password.trim() === '') {
    return next(new ClientError('Email and Password are required', 400));
  }

  const sql = `
    select "userId"
    from "users"
    where "email" = $1 and "password" = $2
  `;
  const params = [email, password];
  db.query(sql, params)
    .then(result => {
      const userId = result.rows[0];
      if (!userId) {
        throw new ClientError('No userId found', 404);
      } else {
        res.json(userId);
      }
    })
    .catch(err => {
      next(err);
    });
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
