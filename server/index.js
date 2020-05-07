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

app.get('/api/tickets/:userId', (req, res, next) => {
  const { userId } = req.params;
  if (userId < 0 || userId === null) {
    return next(new ClientError('Valid entry is required.', 400));
  }
  const sql = `
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
        order by "t"."dueDate"
      `;
  const params = [userId];
  db.query(sql, params).then(result => {
    if (!result.rows) {
      throw new ClientError('No assigned tickets available', 404);
    } else {
      res.json(result.rows);
    }
  });
});

app.post('/api/tickets', (req, res, next) => {
  const {
    status,
    priority,
    description,
    details,
    startDate,
    dueDate,
    ownerId,
    assignedToId,
    customerId
  } = req.body;

  if (!status || parseInt(status, 10) <= 0 ||
    !priority || parseInt(priority, 10) === 0 ||
    !description || description.trim().length === 0 ||
    !details || details.trim().length === 0 ||
    !startDate || parseInt(startDate, 10) <= 0 ||
    !dueDate || parseInt(dueDate, 10) <= 0 ||
    !ownerId || parseInt(ownerId, 10) <= 0 ||
    !assignedToId || parseInt(assignedToId, 10) <= 0 ||
    !customerId || parseInt(customerId, 10) <= 0) {
    return next(new ClientError('either missing field or in improper format', 400));
  }

  const sql = `
    insert into "tickets"
      ("status",
       "priority",
       "description",
       "details",
       "startDate",
       "dueDate",
       "ownerId",
       "assignedToId",
       "customerId")
    values ($1, $2, $3, $4, to_timestamp($5 / 1000.0), to_timestamp($6 / 1000.0), $7, $8, $9)
    returning *
  `;
  const params = [status, priority, description, details, startDate, dueDate, ownerId, assignedToId, customerId];
  db.query(sql, params)
    .then(result => {
      const ticket = result.rows[0];
      if (!ticket) {
        throw new ClientError('ticket could not be created', 400);
      } else {
        res.status(201).json(ticket);
      }
    })
    .catch(err => next(err));
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
        order by "t"."dueDate"
        limit 5;
      `;

      return db.query(ticketQuery, params)
        .then(result => {
          const tickets = result.rows;
          dashboardResponse.ticketList = tickets;
          return dashboardResponse;
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

app.get('/api/customers/:customerId', (req, res, next) => {
  const id = req.params.customerId;
  if (id < 0 || id === null) {
    return next(new ClientError('Valid entry is required.', 400));
  }
  const sql = `
    select "firstName",
           "lastName",
           "addressStreet",
           "addressCity",
           "addressState",
           "addressZip",
           "companyName",
           "jobTitle",
           "phoneNumber",
           "email"
      from "customers"
     where "customerId" = $1
  `;
  const params = [id];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(`Unable to find  id of ${params[0]}`, 404);
      } else {
        const response = { customerInfo: result.rows[0] };
        return response;
      }
    })
    .then(result => {
      const response = result;
      const sql = `
    select *
      from "interactions"
     where "customerId" = $1
  `;
      return db.query(sql, params)
        .then(result => {
          response.interactions = result.rows;
          return response;
        })
        .catch(err => next(err));
    })
    .then(result => {
      res.json(result);
    })
    .catch(err => next(err));
});

app.get('/api/ticket/:ticketId', (req, res, next) => {
  const { ticketId } = req.params;
  if (!parseInt(ticketId, 10) || Math.sign(ticketId) !== 1) {
    return next(new ClientError('ticketId must be a positive integer', 400));
  }

  const params = [ticketId];
  const ticketQuery = `
        select "t"."ticketId",
          "s"."name" as "status",
          "p"."name" as "priority",
          "t"."description",
          "t"."details",
          "t"."startDate",
          "t"."dueDate",
          "o"."firstName" as "ownerFirstName",
          "o"."lastName" as "ownerLastName",
          "a"."firstName" as "assigneeFirstName",
          "a"."lastName" as "assigneeLastName",
          "c"."firstName" as "custFirstName",
          "c"."lastName" as "custLastName"
      from "tickets" as "t"
    inner join "ticketPriority" as "p"
        on "t"."priority" = "p"."priorityId"
    inner join "ticketStatus" as "s"
        on "t"."status" = "s"."statusId"
    inner join "users" as "o"
        on "t"."ownerId" = "o"."userId"
    inner join "users" as "a"
        on "t"."assignedToId" = "a"."userId"
      join "customers" as "c" using ("customerId")
    where "t"."ticketId" = $1;
  `;
  db.query(ticketQuery, params)
    .then(result => {
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});


app.post('/api/customers', (req, res, next) => {
  const {
    firstName,
    lastName,
    companyName,
    jobTitle,
    phoneNumber,
    email,
    addressStreet,
    addressCity,
    addressState,
    addressZip,
    repId
  } = req.body;

  if (!firstName || firstName.trim().length === 0 ||
      !lastName || lastName.trim().length === 0 ||
      !companyName || companyName.trim().length === 0 ||
      !jobTitle || jobTitle.trim().length === 0 ||
      !phoneNumber || phoneNumber.trim().length === 0 ||
      !email || email.trim().length === 0 ||
      !addressStreet || addressStreet.trim().length === 0 ||
      !addressCity || addressCity.trim().length === 0 ||
      !addressState || addressState.trim().length === 0 ||
      !addressZip || addressZip.trim().length === 0 ||
      !repId || parseInt(repId, 10) <= 0) {
    return next(new ClientError('either missing field or in improper format', 400));
  }

  const sql = `
    insert into "customers"
       ("firstName",
        "lastName",
        "companyName",
        "jobTitle",
        "phoneNumber",
        "email",
        "addressStreet",
        "addressCity",
        "addressState",
        "addressZip",
        "repId")
    values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    returning *
  `;
  const params = [
    firstName,
    lastName,
    companyName,
    jobTitle,
    phoneNumber,
    email,
    addressStreet,
    addressCity,
    addressState,
    addressZip,
    repId];
  db.query(sql, params)
    .then(result => {
      const customer = result.rows[0];
      if (!customer) {
        throw new ClientError('Customer could not be created', 400);
      } else {
        res.status(201).json(customer);
      }
    })
    .catch(err => next(err));
});

app.delete('/api/customers/:customerId', (req, res, next) => {
  const { customerId } = req.params;
  if (!parseInt(customerId, 10) || Math.sign(customerId) !== 1) {
    return next(new ClientError('userId must be a positive integer', 400));
  }

  const params = [customerId];
  const customerQuery = `
    select *
      from "customers"
     where "customerId" = $1;
  `;
  db.query(customerQuery, params)
    .then(result => {
      const customer = result.rows[0];
      if (!customer) {
        throw next(new ClientError(`There were zero customers found for customerId ${params[0]}`, 404));
      } else {
        return customer.customerId;
      }
    })
    .then(customerId => {
      const params = [customerId];
      const ticketQuery = `
        delete from "tickets"
         where "customerId" = $1;
      `;
      return db.query(ticketQuery, params)
        .then(result => {
          const customerId = params[0];
          return customerId;
        })
        .catch(err => next(err));
    })
    .then(customerId => {
      const params = [customerId];
      const interactionQuery = `
        delete from "interactions"
         where "customerId" = $1;
      `;
      return db.query(interactionQuery, params)
        .then(result => {
          const customerId = params[0];
          return customerId;
        })
        .catch(err => next(err));
    })
    .then(customerId => {
      const params = [customerId];
      const customerQuery = `
        delete from "customers"
         where "customerId" = $1;
      `;
      return db.query(customerQuery, params)
        .then(result => {
          const customerId = params[0];
          return customerId;
        })
        .catch(err => next(err));
    })
    .then(customerId => {
      res.status(204).json();
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
