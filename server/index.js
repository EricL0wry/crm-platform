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
    select "userId", "email"
    from "users"
    where "email" = $1 and "password" = $2
  `;
  const params = [email, password];
  db.query(sql, params)
    .then(result => {
      const user = result.rows[0];
      if (!user) {
        throw new ClientError('No userId found', 404);
      } else {
        res.json(user);
      }
    })
    .catch(err => {
      next(err);
    });
});

app.get('/api/users/:userId', (req, res, next) => {
  const id = req.body.userId;
  if (id < 0 || id === null) {
    return next(new ClientError('Valid entry is required.', 400));
  }
  const sql = `
    select "firstName",
           "lastName",
           "companyName",
           "jobTitle",
           "phoneNumber",
           "email"
      from "users"
     where "userId" = $1
  `;
  const params = [req.params.userId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        next(new ClientError(`Unable to find  id of ${params[0]}`), 404);
      } else {
        res.json(result.rows[0]);
      }
    })
    .catch(err => next(err));
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
