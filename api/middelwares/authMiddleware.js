const jwt = require('jsonwebtoken');

const setUser = (req, res, next) => {
  const authHeader = req.get('authorization');

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
          const error = new Error('🚫 Un-Authorized 🚫');
          res.status(401);
          next(error);
        }
        req.user = user;
        console.log('ok');
        next();
      });
    } else {
      next();
    }
  } else {
    next();
  }
};

const isAuth = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    const error = new Error('🚫 Un-Authorized 🚫');
    res.status(401);
    next(error);
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role === 'admin') {
    next();
  } else {
    const error = new Error('🚫 Un-Authorized 🚫');
    res.status(401);
    next(error);
  }
};

module.exports = {
  setUser,
  isAuth,
  isAdmin,
};
