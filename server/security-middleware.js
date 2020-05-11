const ClientError = require('./client-error');

const securityMiddleware = function (req, res, next) {
  if (!req.session.userId) {
    return next(new ClientError('user must be logged in to access this endpoint', 403));
  }

  next();
};

module.exports = securityMiddleware;
