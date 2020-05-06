require('dotenv/config');
const express = require('express');
const fetch = require('node-fetch');

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

app.get('/api/dashboard/:userId', (req, res, next) => {
  const { userId } = req.params;
  if (!parseInt(userId, 10)) {
    return next(new ClientError('"userId" must be a positive integer', 400));
  }

  const params = [userId];
  const userQuery = `
    select "firstName",
           "addressZip"
      from "users"
     where "userId" = $1
  `;

  db.query(userQuery, params)
    .then(result => {
      const dashboardResponse = { userInfo: result.rows[0] };
      return dashboardResponse;
    })
    .then(result => {
      const dashboardResponse = result;
      const ticketQuery = `
        select "t"."ticketId",
              "t"."description",
              "t"."priority",
              "t"."dueDate",
              "c"."firstName",
              "c"."lastName",
              "u"."firstName" as "ownerFirstName",
              "u"."lastName" as "ownerLastName"
          from "tickets" as "t"
          join "customers" as "c" using ("customerId")
         inner join "users" as "u"
            on "t"."ownerId" = "u"."userId"
        where "t"."ownerId" = $1
        order by "t"."dueDate" asc
        limit 5;
      `;

      return db.query(ticketQuery, params)
        .then(result => {
          const tickets = result.rows;
          if (!tickets.length) {
            next(new ClientError(`There were zero tickets found for userId ${params[0]}`, 404));
          } else {
            dashboardResponse.ticketList = tickets;
            return dashboardResponse;
          }
        })
        .catch(err => next(err));
    })
    .then(result => {
      const dashboardResponse = result;
      const { addressZip } = dashboardResponse.userInfo;
      return fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${addressZip}&units=imperial&appid=${process.env.MAP_KEY}`)
        .then(response => response.json())
        .then(weather => {
          dashboardResponse.weather = weather;
          return dashboardResponse;
        })
        .catch(err => next(err));
    })
    .then(result => {
      res.json(result);
    })
    .catch(err => next(err));
});

app.get('/api/users/:userId', (req, res, next) => {
  const id = req.params.userId;
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
  const params = [id];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(`Unable to find  id of ${params[0]}`, 404);
      } else {
        res.json(result.rows[0]);
      }
    })
    .catch(err => next(err));
});

app.get('/api/customerlist/:userId', (req, res, next) => {
  const userId = req.params.userId;
  if (!parseInt(userId, 10)) {
    return next(new ClientError('"userId" must be a positive integer', 400));
  }

  const sql = `
    select "customerId",
           "firstName",
           "lastName",
           "phoneNumber",
           "email"
    from "customers"
    where "repId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      const customers = result.rows;
      res.status(200).json(customers);
    })
    .catch(err => next(err));
});

app.get('/api/org/:userId', (req, res, next) => {
  const { userId } = req.params;
  if (!parseInt(userId, 10)) {
    return next(new ClientError('"userId" must be a positive integer', 400));
  }

  const params = [userId];
  const orgQuery = `
    select "firstName",
           "lastName",
           "phoneNumber",
           "email"
      from "users"
     where not "userId" = $1
  `;

  db.query(orgQuery, params)
    .then(result => {
      res.json(result.rows);
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
