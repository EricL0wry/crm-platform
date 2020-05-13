require('dotenv/config');
const express = require('express');
const fetch = require('node-fetch');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');
const securityMiddleware = require('./security-middleware');
const bcrypt = require('bcrypt');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/login', (req, res, next) => {
  const userId = req.session.userId;
  if (!userId) {
    return next(new ClientError('No user logged in', 404));
  }
  const sql = `
    select "userId", "email"
      from "users"
     where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      const user = result.rows[0];
      if (!user) {
        delete req.session.userId;
        throw new ClientError('User could not be found', 404);
      }
      res.status(200).json(user);
    })
    .catch(err => next(err));
});

app.post('/api/login', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (email.trim() === '' || password.trim() === '') {
    return next(new ClientError('Email and Password are required', 400));
  }

  const sql = `
    select "userId", "email", "password"
    from "users"
    where "email" = $1
  `;
  const params = [email];
  db.query(sql, params)
    .then(result => {
      const user = result.rows[0];
      if (!user) {
        return next(new ClientError('No userId found', 404));
      }
      return bcrypt.compare(password, user.password)
        .then(result => {
          if (result) {
            delete user.password;
            req.session.userId = user.userId;
            return res.status(200).json(user);
          } else {
            throw new ClientError('Incorrect password', 204);
          }
        });
    })
    .catch(err => {
      next(err);
    });
});

app.post('/api/logout', (req, res, next) => {
  const userId = req.session.userId;
  if (!userId) {
    return next(new ClientError('No user logged in', 404));
  }

  delete req.session.userId;
  res.status(204).json();
});

app.use(securityMiddleware);

app.post('/api/signup', (req, res, next) => {
  const {
    firstName,
    lastName,
    jobTitle,
    email,
    password
  } = req.body;

  if (!firstName || firstName.trim().length === 0 ||
    !lastName || lastName.trim().length === 0 ||
    !jobTitle || jobTitle.trim().length === 0 ||
    !email || email.trim().length === 0 ||
    !password || password.trim().length === 0) {
    return next(new ClientError('either missing field or in improper format', 400));

  }
  const companyName = 'LearningFuze';
  const phoneNumber = '9496797699';
  const addressStreet = '9200 Irvine Center Dr. #200';
  const addressCity = 'Irvine';
  const addressState = 'CA';
  const addressZip = '92618';

  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, (ignoreMe, hash) => {
    const sql = `
        insert into "users"
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
           "password"
          )
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        returning "firstName",
                  "lastName",
                  "companyName",
                  "jobTitle",
                  "phoneNumber",
                  "email",
                  "addressStreet",
                  "addressCity",
                  "addressState",
                  "addressZip"
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
      hash
    ];
    db.query(sql, params)
      .then(result => {
        const newUser = result.rows[0];
        if (!newUser) {
          throw new ClientError('User could not be created', 400);
        } else {
          res.status(201).json(newUser);
        }
      })
      .catch(err => next(err));
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

app.get('/api/tickets/newform/:userId', (req, res, next) => {
  const { userId } = req.params;
  if (!userId || parseInt(userId, 10) <= 0) {
    return next(new ClientError('param "userId" must be included', 400));
  }

  const sql = `
    select "customerId",
           "firstName",
           "lastName"
      from "customers"
     where "repId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      const customers = result.rows;
      if (customers.length === 0) {
        throw new ClientError('this user has no customers', 404);
      }
      const sql = `
        select *
        from "ticketPriority"
      `;
      return db.query(sql)
        .then(result => {
          const ticketPriorities = result.rows;
          if (ticketPriorities.length === 0) {
            throw new ClientError('there are no available ticket priorities', 404);
          }
          const sql = `
            select "userId", "firstName", "lastName"
            from "users"
          `;
          return db.query(sql)
            .then(result => {
              const users = result.rows;
              const response = {};
              response.customers = customers;
              response.ticketPriorities = ticketPriorities;
              response.users = users;
              res.status(200).json(response);
            });
        });
    })
    .catch(err => next(err));
});

app.get('/api/tickets/editform/:ticketId', (req, res, next) => {
  const { ticketId } = req.params;
  if (!ticketId || parseInt(ticketId, 10) <= 0) {
    return next(new ClientError('param "ticketId" must be included', 400));
  }

  const sql = `
    select "ticket".*,
           "customer"."customerId",
           "customer"."firstName" as "customerFirstName",
           "customer"."lastName" as "customerLastName"
      from "tickets" as "ticket"
      join "customers" "customer"
     using("customerId")
     where "ticketId" = $1
  `;
  const params = [ticketId];
  db.query(sql, params)
    .then(result => {
      const ticket = result.rows[0];
      if (!ticket) {
        throw new ClientError('no such ticket exists', 404);
      }
      const sql = `
        select *
          from "ticketPriority"
      `;
      return db.query(sql)
        .then(result => {
          const ticketPriorities = result.rows;
          if (ticketPriorities.length === 0) {
            throw new ClientError('there are no available ticket priorities', 404);
          }
          const sql = `
            select *
            from "ticketStatus"
          `;
          return db.query(sql)
            .then(result => {
              const ticketStatuses = result.rows;
              if (ticketStatuses.length === 0) {
                throw new ClientError('there are no available ticket statuses', 404);
              }
              const sql = `
                select "userId", "firstName", "lastName"
                from "users"
              `;
              return db.query(sql)
                .then(result => {
                  const users = result.rows;
                  const response = {};
                  response.ticket = ticket;
                  response.ticketPriorities = ticketPriorities;
                  response.ticketStatuses = ticketStatuses;
                  response.users = users;
                  res.status(200).json(response);
                });
            });

        });
    })
    .catch(err => next(err));
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
    !ownerId || parseInt(ownerId, 10) <= 0 ||
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
      return fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=${addressZip}&units=imperial&appid=${process.env.MAP_KEY}`)
        .then(response => response.json())
        .then(weather => {
          dashboardResponse.weather_3days = weather;
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
    order by "customerId"
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
           "email",
           "userId"
      from "users"
     where not "userId" = $1
  `;

  db.query(orgQuery, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.put('/api/customers/', (req, res, next) => {
  const {
    customerId,
    firstName,
    lastName,
    companyName,
    jobTitle,
    phoneNumber,
    email,
    addressStreet,
    addressCity,
    addressState,
    addressZip
  } = req.body;

  if (!customerId || parseInt(customerId, 10) <= 0 ||
    !firstName || firstName.trim().length === 0 ||
    !lastName || lastName.trim().length === 0 ||
    !companyName || companyName.trim().length === 0 ||
    !jobTitle || jobTitle.trim().length === 0 ||
    !phoneNumber || phoneNumber.trim().length === 0 ||
    !email || email.trim().length === 0 ||
    !addressStreet || addressStreet.trim().length === 0 ||
    !addressCity || addressCity.trim().length === 0 ||
    !addressState || addressState.trim().length === 0 ||
    !addressZip || addressZip.trim().length === 0) {
    return next(new ClientError('either missing field or in improper format', 400));
  }

  const sql = `
    update "customers"
       set "firstName" = $1,
           "lastName" = $2,
           "companyName" = $3,
           "jobTitle" = $4,
           "phoneNumber" = $5,
           "email" = $6,
           "addressStreet" = $7,
           "addressCity" = $8,
           "addressState" = $9,
           "addressZip" = $10
     where "customerId" = $11
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
    customerId];
  db.query(sql, params)
    .then(result => {
      const customer = result.rows[0];
      if (!customer) {
        throw new ClientError('Customer could not be found', 404);
      } else {
        res.status(201).json(customer);
      }
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

app.get('/api/customers/edit/:customerId', (req, res, next) => {
  const id = req.params.customerId;
  if (id < 0 || id === null) {
    return next(new ClientError('Valid entry is required.', 400));
  }
  const sql = `
    select *
      from "customers"
      where "customerId" = $1
  `;
  const params = [id];
  db.query(sql, params)
    .then(result => {
      const customer = result.rows[0];
      if (!customer) {
        throw new ClientError(`Unable to find id of ${id}`, 404);
      }
      res.status(200).json(customer);
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

app.get('/api/location/:custId', (req, res, next) => {
  const { custId } = req.params;
  if (!parseInt(custId, 10)) {
    return next(new ClientError('"custId" must be a positive integer', 400));
  }

  const params = [custId];
  const custQuery = `
    select "firstName",
           "lastName",
           "addressStreet",
           "addressCity",
           "addressState",
           "addressZip"
      from "customers"
     where "customerId" = $1
  `;

  db.query(custQuery, params)
    .then(result => {
      const locationResponse = { userInfo: result.rows[0] };
      return locationResponse;
    })
    .then(result => {
      const locationResponse = result;
      const { addressStreet: street, addressCity: city, addressState: state, addressZip: zip, firstName } = result.userInfo;
      const addr = `${street}, ${city}, ${state}, ${zip}`;
      const initial = firstName[0];

      const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?zoom=13&size=290x375&markers=size:mid%7Ccolor:red%7Clabel:${initial}%7C%22${addr}%22&center=%22${addr}%22&key=${process.env.GOOGLE_MAP_KEY}`;
      const googleUrl = `https://www.google.com/maps/search/?api=1&query=%22${addr}%22`;

      locationResponse.mapUrl = mapUrl;
      locationResponse.googleUrl = googleUrl;

      res.json(locationResponse);
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

app.put('/api/tickets', (req, res, next) => {
  const {
    status,
    priority,
    description,
    details,
    dueDate,
    assignedToId,
    customerId,
    ticketId
  } = req.body;

  if (!status || parseInt(status, 10) <= 0 ||
    !priority || parseInt(priority, 10) === 0 ||
    !description || description.trim().length === 0 ||
    !details || details.trim().length === 0 ||
    !ticketId || parseInt(ticketId, 10) <= 0 ||
    !customerId || parseInt(customerId, 10) <= 0) {
    return next(new ClientError('either missing field or in improper format', 400));
  }

  const params = [customerId, assignedToId, priority, status, dueDate, description, details, ticketId];
  const ticketQuery = `
        update  "tickets"
           set "customerId" = $1,
               "assignedToId" = $2,
               "priority" = $3,
               "status" = $4,
               "dueDate" = to_timestamp($5 / 1000.0),
               "description" = $6,
               "details" = $7
         where "ticketId" = $8
         returning *
  `;

  db.query(ticketQuery, params)
    .then(result => {
      const ticket = result.rows[0];
      if (!ticket) {
        throw new ClientError('Unable to edit the ticket', 400);
      } else {
        res.status(200).json(ticket);
      }
    }).catch(err => next(err));

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

app.post('/api/interactions', (req, res, next) => {
  const {
    type,
    notes,
    timeCreated,
    userId,
    customerId
  } = req.body;

  if (!type || type.trim().length === 0 ||
    !timeCreated ||
    !notes || notes.trim().length === 0 ||
    !customerId || parseInt(customerId, 10) <= 0 ||
    !userId || parseInt(userId, 10) <= 0) {
    return next(new ClientError('either missing field or in improper format', 400));
  }

  const sql = `
    insert into "interactions"
       ("type",
        "notes",
        "timeCreated",
        "userId",
        "customerId")
    values ($1, $2, to_timestamp($3 / 1000.0), $4, $5)
    returning *
  `;
  const params = [
    type,
    notes,
    timeCreated,
    userId,
    customerId
  ];
  db.query(sql, params)
    .then(result => {
      const interaction = result.rows[0];
      if (!interaction) {
        throw new ClientError('Interaction could not be created', 400);
      } else {
        res.status(201).json(interaction);
      }
    })
    .catch(err => next(err));
});

app.delete('/api/interactions/:interactionId', (req, res, next) => {
  const { interactionId } = req.params;
  if (!parseInt(interactionId, 10) || Math.sign(interactionId) !== 1) {
    return next(new ClientError('userId must be a positive integer', 400));
  }

  const params = [interactionId];
  const customerQuery = `
    delete from "interactions"
         where "interactionId" = $1;
  `;
  db.query(customerQuery, params)
    .then(result => {
      res.status(204).json();
    })
    .catch(err => next(err));
});

app.delete('/api/tickets/:ticketId', (req, res, next) => {
  const { ticketId } = req.params;
  if (!parseInt(ticketId, 10) || Math.sign(ticketId) !== 1) {
    return next(new ClientError('userId must be a positive integer', 400));
  }

  const params = [ticketId];
  const customerQuery = `
    delete from "tickets"
         where "ticketId" = $1;
  `;
  db.query(customerQuery, params)
    .then(result => {
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
